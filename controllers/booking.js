
import Booking from "../models/Booking.js"

export const booking=async(req,res,next)=>{
    // const {place,checkIn,checkOut,numberOfGuests,name,phone}= req.body
    console.log(req.body,"new booking is sucss")
    
    const newBooking=new Booking(req.body); 
    console.log(newBooking,"new booking is sucss booking")
        const savedBooking=await newBooking.save()
            res.status(200).json({savedBooking,message:"saved Booking"})

    // try {
    // } catch (err) {
    //     next(err)
    // }
}