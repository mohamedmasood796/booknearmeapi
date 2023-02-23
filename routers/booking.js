

import express from "express";
import { booking, verify } from "../controllers/booking.js";
const router=express.Router()
import authMiddleware from "../utils/authJwtMiddleware.js";

router.post("/booking",booking)
router.post("/verify",authMiddleware,verify)





export default router