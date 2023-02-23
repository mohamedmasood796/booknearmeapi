import express from "express";
import Stripe from 'stripe';
import jwt from "jsonwebtoken";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
console.log(stripe,"masooo alab")

import Booking from "../models/Booking.js"

export const booking = async (req, res, next) => {

  console.log('req.body:', req.body); // Log the request body
  const {_id,...product}=req.body;
  const tokenData = {
    _id,...product
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
        cancel_url:`${process.env.CLIENT_URL}/cancel`, 
      }); 
    // res.json({ id: session.id });
    res.send({ url: session.url });
};


export const verify = async (req, res, next) => {
  const {newOrder,userId}=req.body
console.log(userId,2855);
  console.log(newOrder,"data token is here")
  const verify = await jwt.verify(newOrder, process.env.JWT)
  console.log(verify.newOrder);
  let insideobj=verify.newOrder
  const newarr={...insideobj,userId}
  const {_id,...others}=newarr
  console.log(others,"this is token form jw")
  const newHotel = new Booking(others);
  const savedOrder = await newHotel.save()
}
