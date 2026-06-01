import Chat from "../models/Chat.js";
import User from "../models/User.js"
import axios from "axios";
import imagekit from "../configs/imageKit.js";
import openai from "../configs/openai.js";

//  Text-Based AI Chat Message Controller
export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        // Check credits
        if (req.user.credit < 1) {
            return res.json({
                success: false,
                message: "Insufficient credits"
            });
        }

        const { chatId, prompt } = req.body;

        const chat = await Chat.findOne({
            userId,
            _id: chatId
        });

        chat.messages.push({
            role: "user",
            content: prompt,
            timeStamp: Date.now(),
            isImage: false
        });

        const { choices } =
            await openai.chat.completions.create({
                model: "gemini-2.5-flash",
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            });

        const reply = {
            ...choices[0].message,
            timeStamp: Date.now(),
            isImage: false
        };

        chat.messages.push(reply);

        await chat.save();

        await User.updateOne(
            { _id: userId },
            { $inc: { credit: -1 } }
        );

        res.json({
            success: true,
            reply
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

// Iamge Generation Message Controller
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        // Check credits
        if (req.user.credit < 2) {
            return res.json({
                success: false,
                message: "Insufficient credits"
            });
        }

        const { prompt, chatId, isPublished } = req.body;

        // Find chat
        const chat = await Chat.findOne({
            userId,
            _id: chatId
        });

        // Push user message
        chat.messages.push({
            role: "user",
            content: prompt,
            timeStamp: Date.now(),
            isImage: false
        });

        // Encode prompt
        const encodedPrompt =
            encodeURIComponent(prompt);

        // Generate Image URL
        const generatedImageUrl =
            `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/nexaai/${Date.now()}.png?tr=w-800,h-800`;

        // Fetch generated image
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
                folder: "NexaAI"
            });

        const reply = {
            role: "assistant",
            content:
                uploadResponse.url,
            timeStamp:
                Date.now(),
            isImage: true,
            isPublished
        };

        // Save message
        chat.messages.push(reply);
        await chat.save();

        // Deduct credits
        await User.updateOne(
            { _id: userId },
            {
                $inc: {
                    credit: -2
                }
            }
        );

        // Send response ONLY ONCE
        return res.json({
            success: true,
            reply
        });

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
};