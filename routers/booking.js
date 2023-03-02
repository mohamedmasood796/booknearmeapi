

import express from "express";
import { booking, bookingId, bookings, verify } from "../controllers/booking.js";
const router=express.Router()
import authMiddleware from "../utils/authJwtMiddleware.js";

router.post("/booking",booking)
router.post("/verify",authMiddleware,verify)
router.get("/bookings",authMiddleware,bookings)
router.post("/bookingId",authMiddleware,bookingId)






export default router