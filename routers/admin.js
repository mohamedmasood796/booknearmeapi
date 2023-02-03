


import express from "express";
import { adminlogin, changeStatus } from "../controllers/admin.js";
const router=express.Router()


router.post("/adminlogin",adminlogin)
router.put("/changestatus",changeStatus)



export default router