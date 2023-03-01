

import express from "express"
import { addCity, countByCity, countByType, createHotel, deleteHotel, getCity, getHotel, getHotelRooms, getHotels, getHotelsAdmin, getType, updateHotel } from "../controllers/hotel.js"
import { createRoom } from "../controllers/room.js"
import Hotel from "../models/Hotel.js"
import { verifyAdmin } from "../utils/verifyToken.js"
const router =express.Router()



//create
router.post("/",createHotel)

//update

router.put("/:id",updateHotel)

//delect

router.delete("/:id",deleteHotel)

//get

router.get("/find/:id",getHotel)

//get all 
router.get("/",getHotels)
router.get("/admin",getHotelsAdmin)
router.get("/countByCity",countByCity)
router.get("/countByType",countByType)
router.get("/room/:id",getHotelRooms)

//add city 
router.post("/city",addCity)
router.post("/getcity",getCity)
router.get("/type/:searchType",getType)







export default router