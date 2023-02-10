import express from "express"
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js"
import { verifyAdmin } from "../utils/verifyToken.js"
const router =express.Router()





//create
router.post("/:hotelid",createRoom)

//update

router.put("/availability/:roomId/:roomNumberId" ,updateRoomAvailability)
router.put("/:id" ,updateRoom)
// router.put("/:id",verifyAdmin ,updateRoom)

//delect

router.delete("/:id/:hotelid",deleteRoom)

//get

router.get("/:id",getRoom)

//get all 
router.get("/",getRooms)










export default router