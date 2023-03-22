import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { sendEmail } from "../utils/sentMail.js";
import {generateToken} from "../utils/jwt.js"

dotenv.config()



export const register = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user){
            res.json({ status: false, message: 'user already exist' })
        } else{

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const newUser =await new User({
                ...req.body,
                password: hash,
            }).save()
            const url=`${`https://booknearmeserver.hamrix.store`}/verify?id=${newUser._id}`
           await sendEmail(req.body.email, "click to verify your account", url)

            // const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, `${process.env.JWT}`)
            const token = await generateToken({ id: user._id.toString() });
            res.cookie("access_token", token, { httpOnly: true, }).status(200).json({  token, status: true, userExist: true, message: 'user account created' })

            res.status(200).json({ status: true, message: "User has been created" })
        }
    } catch (err) {
        next(err)
    }
}

//login
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return res.json({ status: false, message: "user not found" })
        // next(createError(404, "User not found !"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return res.json({ status: false, message: "wrong password or username" })
        // next(createError(400, "Wrong password or username"))

        // const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, `${process.env.JWT}`)

        const token = await generateToken({ id: user._id.toString() });
        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, { httpOnly: true, }).status(200).json({ ...otherDetails, token, status: true, userExist: true, message: 'user logined' })
        // res.status(200).json({...otherDetails}) 
    } catch (err) {
        next(err)
    }
}


export const verifyUser= async (req, res, next) => {

  const user=await User.findOne({_id:req.params.id})

  if(!user) return res.json({ status: false, message: "please register" }) 
  if(user){
    await User.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            verify:true
        }
    })
    res.json({ status:true, message: "verify" }) 
  }

}