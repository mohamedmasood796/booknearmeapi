


import express from "express";
import { adminlogin, bookingChart, bookingDetails, changeStatus, paymentChart } from "../controllers/admin.js";
const router=express.Router()


router.post("/adminlogin",adminlogin)
router.put("/changestatus",changeStatus)
router.get("/paymentChart",paymentChart)
router.get("/bookingChart",bookingChart)
router.get("/bookingDetails",bookingDetails)



export default router