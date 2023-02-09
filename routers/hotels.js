

import express from "express"
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotel.js"
import { createRoom } from "../controllers/room.js"
import Hotel from "../models/Hotel.js"
import { verifyAdmin } from "../utils/verifyToken.js"
const router =express.Router()



//create
router.post("/",createHotel)

//update

router.put("/:id",verifyAdmin ,updateHotel)

//delect

router.delete("/:id",deleteHotel)

//get

router.get("/find/:id",getHotel)

//get all 
router.get("/",getHotels)
router.get("/countByCity",countByCity)
router.get("/countByType",countByType)
router.get("/room/:id",getHotelRooms)







export default router