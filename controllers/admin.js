import Admin from "../models/Admin.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

//login
export const adminlogin = async (req, res, next) => {
    console.log(req.body)
    try {
        console.log( req.body.email ," req.body.username ")
        const admin = await Admin.findOne({ email:req.body.email })
        console.log(admin,"new admin text");
        if (!admin) return res.json({ status: false, message: "admin not found" })
        // next(createError(404, "User not found !"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, admin.password)
        if (!isPasswordCorrect) return res.json({ status: false, message: "wrong password or username" })
        // next(createError(400, "Wrong password or username"))

        const token = jwt.sign({ id: admin._id, isAdmin: admin.isAdmin }, `${process.env.JWT}`)

        // const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, { httpOnly: true, }).status(200).json({  token, status: true, message: 'admin logined' })
        // res.status(200).json({...otherDetails}) 
    } catch (err) {
        console.log("haikoo")
        next(err)
    }
}
