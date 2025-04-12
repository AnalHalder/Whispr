const bcrypt = require('bcryptjs')
const generateToken = require('../config/generateToken')
const User = require('../models/user.model')

const logIn = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "please fill all required fields" });
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "email does not exists" })
        }
        const passwordMatch = bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "password does not match" })
        }
        const token = generateToken(user._id, res);
        res.status(200).json({ message: "logged in successfully", user, token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}
function logOut(req, res) {
    try {
        res.cookie("jwt", "", { maxAge: "0" });
        res.status(200).json({ message: "loged out successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
const checkAuth = (req, res) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const signUp = async (req, res) => {
    const { name, email, password } = req.body
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "please fill all required fields" });
        }
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: "email  already exists" })
        }
        else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
            })

            if (newUser) {
                const token = generateToken(newUser._id, res);
                return res.status(200).json({ message: `new user created`, user: newUser, jwt: token })
            } else {
                return res.status(400).json({ message: "something went wrong" })
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" })
    }
}

module.exports = {
    logIn,
    signUp,
    logOut,
    checkAuth,
}