import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Chat from '../models/Chat.js'

// Generate JWT
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d',
        }
    )
}

// Register User
export const registerUser =
    async (req, res) => {
        const {
            name,
            email,
            password,
        } = req.body

        try {
            const userExists =
                await User.findOne({
                    email,
                })

            if (userExists) {
                return res.json({
                    success: false,
                    message:
                        'User already exists',
                })
            }

            // Password will hash automatically
            // in User model
            const user =
                await User.create({
                    name,
                    email,
                    password,
                })

            const token =
                generateToken(
                    user._id
                )

            // Don't send password
            const userData = {
                _id: user._id,
                name: user.name,
                email: user.email,
                credit:
                    user.credit,
            }

            return res.json({
                success: true,
                user,
                token,
            })
        } catch (error) {
            return res.json({
                success: false,
                message:
                    error.message,
            })
        }
    }

// Login User
// Login User
export const loginUser = async (req, res) => {
    const {
        email,
        password,
    } = req.body

    try {
        const user =
            await User.findOne({
                email,
            })

        if (!user) {
            return res.json({
                success: false,
                message:
                    'Invalid email or password',
            })
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            )

        if (!isMatch) {
            return res.json({
                success: false,
                message:
                    'Invalid email or password',
            })
        }

        const token =
            generateToken(
                user._id
            )

        return res.json({
            success: true,
            token,
            user,
        })
    } catch (error) {
        return res.json({
            success: false,
            message:
                error.message,
        })
    }
}

// Get User Data
export const getUser =
    async (req, res) => {
        try {
            return res.json({
                success: true,
                user: req.user,
            })
        } catch (error) {
            return res.json({
                success: false,
                message:
                    error.message,
            })
        }
    }

// API to get published images
export const getPublishedImages =
    async (req, res) => {
        try {
            const publishedImageMessages = await Chat.aggregate([
                { $unwind: "$messages" },
                {
                    $match: {
                        "messages.isPublished": true,
                        "messages.isImage": true
                    }
                },
                {
                    $project: {
                        _id: 0,
                        imageUrl: "$messages.content",
                        userName: "$userName"
                    }
                }
            ])

            res.json({
                success: true,
                images: publishedImageMessages.reverse()
            })
        } catch (error) {
            return res.json({
                success: false,
                message:
                    error.message,
            })
        }
    }    
