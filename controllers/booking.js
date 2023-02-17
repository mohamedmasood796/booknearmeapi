
import Booking from "../models/Booking"

export const booking=async(req,res)=>{
    // const {place,checkIn,checkOut,numberOfGuests,name,phone}= req.body
    const newBooking=new Booking(req.body);
    try {
        const savedBooking=await newBooking.save()
        res.status(200).json({savedBooking,message:"saved Booking"})
    } catch (err) {
        next(err)
    }
}