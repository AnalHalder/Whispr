const User = require("../models/user.model")
const Message = require('../models/message.model')

const getUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id
        const alUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password")
        res.status(200).json(alUsers)
    } catch (error) {
        console.log(error);
        res.status(500).json("internal server error")
    }
}

const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const senderId = req.user._id

        const messages = await Message.find({
            $or: [
                { sender: senderId, reciever: userToChatId },
                { sender: userToChatId, reciever: senderId }
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "internal server error" })
    }
}

const sendMessage = async (req, res) => {
    try {
        const { content } = req.body
        const { id: recieverId } = req.params
        const senderId = req.user._id

        if (!content) {
            res.status(400).json({ message: "empty message" })
        }
        const newMessage = await Message.create({
            sender: senderId,
            reciever: recieverId,
            content
        })

        if (newMessage) {
            return res.status(201).json(newMessage)
        } else {
            return res.status(400).json({ message: "something went wrong" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error", error })
    }
}

module.exports = { getUsers, getMessages, sendMessage }