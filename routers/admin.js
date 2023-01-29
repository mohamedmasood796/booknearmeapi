


import express from "express";
import { adminlogin } from "../controllers/admin.js";
const router=express.Router()


router.post("/adminlogin",adminlogin)



export default router