

import express from "express";
import { booking } from "../controllers/booking.js";
const router=express.Router()

router.post("/booking",booking)





export default router