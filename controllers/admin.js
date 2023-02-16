import Admin from "../models/Admin.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User.js";
import {generateToken} from "../utils/jwt.js"

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
        console.log(isPasswordCorrect,"good password")

        const token = await generateToken({ id: admin._id.toString() });

        // const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, { httpOnly: true, }).status(200).json({  token, status: true, message: 'admin logined' })
        // res.status(200).json({...otherDetails}) 
    } catch (err) {
        console.log("haikoo")
        next(err)
    }
}

export const changeStatus = (req,res,next) => {
    const { Status, e } = req.body;
    try {
      void User
        .updateOne(
          { _id: e },
          {
            $set: {
                isBlock: Status,
            },
          }
        )
        .then((date) => {
          res.status(200).send({ Status: true });
        });
    } catch (error) {
      console.log(error);
    }
  };
