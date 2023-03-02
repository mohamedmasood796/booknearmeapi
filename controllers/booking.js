import express from "express";
import Stripe from 'stripe';
import jwt from "jsonwebtoken";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

import Booking from "../models/Booking.js"

export const booking = async (req, res, next) => {

  const { _id, ...product } = req.body;
  const tokenData = {
    _id, ...product
  }

  // create jwt token
  const token = jwt.sign(tokenData, process.env.JWT)

  const unitAmount = parseInt(product.newOrder.price * 100);
  console.log('unitAmount:', unitAmount); // Log the unit amount
  console.log('Amount:', product); // Log the unit amount
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: product.newOrder.name,
          },
          unit_amount: unitAmount,
        },
        quantity: parseInt(product.newOrder.numberOfNights),
      },
    ],
    mode: "payment",
    success_url: (`${process.env.CLIENT_URL}/success?token=${token}`),
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });
  // res.json({ id: session.id });
  res.send({ url: session.url });
};


export const verify = async (req, res, next) => {
  const { newOrder, userId } = req.body

  const verify = await jwt.verify(newOrder, process.env.JWT)
  let insideobj = verify.newOrder
  const newarr = { ...insideobj, userId }
  const { _id, ...others } = newarr
  const newHotel = new Booking(others);
  const savedOrder = await newHotel.save()
}

export const bookings=async(req,res,next)=>{
  try {
      const bookingsdata = await Booking.find(req.body)
      res.status(200).json(bookingsdata)
  } catch (err) {
      next(err)
  }
}

export const bookingId=async(req,res,next)=>{
  try {
    const {bookingId,userId}=req.body
    const bookingid=await Booking.findOne({_id:bookingId,userId:userId})
    if(bookingid){
      return res.status(200).json({bookingid,status:true,message:"This Booking Id valid"})
    }else{
      return res.status(200).json({message:"This Booking Id invalid"})
    }
  } catch (err) {
    next(err)
  }
}


