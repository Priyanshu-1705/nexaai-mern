import Chat from "../models/Chat.js";
import User from "../models/User.js";
import axios from "axios";
import openai from "../configs/openai.js";
import imagekit from "../configs/imageKit.js";

// Text-Based AI Chat Message Controller
export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        // Credit check
        if (req.user.credit < 1) {
            return res.json({
                success: false,
                message: "Insufficient credits"
            });
        }

        const { chatId, prompt } = req.body;

        // Prompt validation
        if (!prompt?.trim()) {
            return res.json({
                success: false,
                message: "Prompt is required"
            });
        }

        // Find chat
        const chat = await Chat.findOne({
            userId,
            _id: chatId
        });

        if (!chat) {
            return res.json({
                success: false,
                message: "Chat not found"
            });
        }

        // Save user message
        chat.messages.push({
            role: "user",
            content: prompt.trim(),
            timestamp: Date.now(),
            isImage: false
        });

        // AI response
        const response =
            await openai.chat.completions.create({
                model: "gemini-2.5-flash",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            });

        const aiMessage =
            response?.choices?.[0]?.message;

        if (!aiMessage) {
            return res.json({
                success: false,
                message: "Failed to generate response"
            });
        }

        const reply = {
            ...aiMessage,
            timestamp: Date.now(),
            isImage: false
        };

        // Save AI response
        chat.messages.push(reply);
        await chat.save();

        // Deduct credit
        await User.updateOne(
            { _id: userId },
            { $inc: { credit: -1 } }
        );

        return res.json({
            success: true,
            reply
        });

    } catch (error) {
        console.log(error);

        return res.json({
            success: false,
            message: error.message
        });
    }
};

// Image Generation Controller
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        // Credit check
        if (req.user.credit < 2) {
            return res.json({
                success: false,
                message: "Insufficient credits"
            });
        }

        const {
            prompt,
            chatId,
            isPublished
        } = req.body;

        // Prompt validation
        if (!prompt?.trim()) {
            return res.json({
                success: false,
                message: "Prompt is required"
            });
        }

        // Find chat
        const chat =
            await Chat.findOne({
                userId,
                _id: chatId
            });

        if (!chat) {
            return res.json({
                success: false,
                message: "Chat not found"
            });
        }

        // Save user message
        chat.messages.push({
            role: "user",
            content: prompt.trim(),
            timestamp: Date.now(),
            isImage: false
        });

        // Encode prompt
        const encodedPrompt =
            encodeURIComponent(
                prompt
            );

        // Generate image URL
        const generatedImageUrl =
            `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/nexaai/${Date.now()}.png?tr=w-800,h-800`;

        // Fetch image
        const aiImageResponse =
            await axios.get(
                generatedImageUrl,
                {
                    responseType:
                        "arraybuffer"
                }
            );

        // Convert to Base64
        const base64Image =
            `data:image/png;base64,${Buffer.from(
                aiImageResponse.data,
                "binary"
            ).toString("base64")}`;

        // Upload to ImageKit
        const uploadResponse =
            await imagekit.files.upload({
                file: base64Image,
                fileName:
                    `${Date.now()}.png`,
                folder:
                    "/NexaAI",
                useUniqueFileName:
                    true
            });

        const reply = {
            role: "assistant",
            content:
                uploadResponse.url,
            timestamp:
                Date.now(),
            isImage: true,
            isPublished
        };

        // Save reply
        chat.messages.push(reply);
        await chat.save();

        // Deduct credit
        await User.updateOne(
            { _id: userId },
            {
                $inc: {
                    credit: -2
                }
            }
        );

        return res.json({
            success: true,
            reply
        });

    } catch (error) {
        console.log(error);

        return res.json({
            success: false,
            message:
                error.message
        });
    }
};

