


import express from "express";
import { adminlogin, bookingChart, bookingDetails, bookingdetailsadmin, cancleBooking, changeStatus, getFullData, paymentChart } from "../controllers/admin.js";
const router=express.Router()


router.post("/adminlogin",adminlogin)
router.put("/changestatus",changeStatus)
router.get("/paymentChart",paymentChart)
router.get("/bookingChart",bookingChart)
router.get("/bookingDetails",bookingDetails)
router.get("/cancleBooking/:id",cancleBooking)
router.get("/bookingdetailsadmin/:id",bookingdetailsadmin)
router.get("/getFullData",getFullData)



export default router