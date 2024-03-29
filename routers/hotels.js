

import express from "express"
import { addCity, checkHotel, countByCity, countByType, createHotel, deleteCity, deleteHotel, getCity, getHotel, getHotelRooms, getHotels, getHotelsAdmin, getHotelsSearch, getType, reviewdata, updateHotel } from "../controllers/hotel.js"
import { createRoom } from "../controllers/room.js"
import Hotel from "../models/Hotel.js"
import authMiddleware from "../utils/authJwtMiddleware.js"
import { verifyAdmin } from "../utils/verifyToken.js"
const router =express.Router()



//create
router.post("/",createHotel)

//update

router.post("/updateHotel",updateHotel)

//delect

router.delete("/:id",deleteHotel)

//get

router.get("/find/:id",getHotel)

//get all by search
router.get("/search",getHotelsSearch)

//get all hotel
router.get("/",getHotels)

router.get("/admin",getHotelsAdmin)
router.get("/countByCity",countByCity)
router.get("/countByType",countByType)
router.get("/room/:id",getHotelRooms)

router.post("/review",authMiddleware,reviewdata)
router.post("/checkHotel",authMiddleware,checkHotel)

//add city 
router.post("/city",addCity)
router.post("/getcity",getCity)
router.delete("/delect/:id",deleteCity)
router.get("/type/:searchType",getType)









export default router