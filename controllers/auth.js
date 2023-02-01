import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()



export const register = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user){
            res.json({ status: false, message: 'user already exist' })
        } else{

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const newUser = new User({
                ...req.body,
                password: hash,
            })
            await newUser.save()
            res.status(200).json({ status: true, message: "User has been created" })
        }
    } catch (err) {
        next(err)
    }
}

//login
export const login = async (req, res, next) => {
    console.log('hai')
    try {
        console.log("hai mukthar")
        const user = await User.findOne({ username: req.body.username })
        if (!user) return res.json({ status: false, message: "user not found" })
        // next(createError(404, "User not found !"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return res.json({ status: false, message: "wrong password or username" })
        // next(createError(400, "Wrong password or username"))

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, `${process.env.JWT}`)

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, { httpOnly: true, }).status(200).json({ ...otherDetails, token, status: true, userExist: true, message: 'user logined' })
        // res.status(200).json({...otherDetails}) 
    } catch (err) {
        console.log("haikoo")
        next(err)
    }
}
