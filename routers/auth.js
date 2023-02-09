

import express from "express";
import { login, register, verifyUser } from "../controllers/auth.js";
import authMiddleware from "../utils/authJwtMiddleware.js";
const router=express.Router()



router.post("/register",register)

router.post("/login",login)

router.put('/verify/:id',verifyUser)



export default router