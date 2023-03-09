


import express from "express";
import { adminlogin, bookingChart, bookingDetails, cancleBooking, changeStatus, paymentChart } from "../controllers/admin.js";
const router=express.Router()


router.post("/adminlogin",adminlogin)
router.put("/changestatus",changeStatus)
router.get("/paymentChart",paymentChart)
router.get("/bookingChart",bookingChart)
router.get("/bookingDetails",bookingDetails)
router.get("/cancleBooking/:id",cancleBooking)



export default router