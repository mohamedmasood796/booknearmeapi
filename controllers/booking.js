import express from "express";
import Stripe from 'stripe';
import jwt from "jsonwebtoken";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

import Booking from "../models/Booking.js"

export const booking = async (req, res, next) => {

  const { ...product } = req.body;

  const { _id, ...datas } = product.newOrder
  const roomId = _id
  const tokenData = {
    roomId, ...datas
  }

  console.log(datas, "222222222222222222222222222222222222222222222222222222222222222222222222")
  console.log(roomId, "3333333333333333333333333333333333333333333")
  console.log(tokenData, "444444444444444444444444444444444444444444444")

  // create jwt token
  const token = jwt.sign(tokenData, process.env.JWT)
  console.log(token, "55555555555555555555555555555555555555")

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
  console.log(newOrder, "66666666666666666666666666666666")
  console.log(userId, "777777777777777777777777777777777")

  const verify = await jwt.verify(newOrder, process.env.JWT)
  console.log(verify, "88888888888888888888888888888888888888888888")
  // let insideobj = verify.newOrder
  // const newarr = { ...insideobj, userId }
  // const { _id, ...others } = newarr
  const others = { userId, ...verify }
  console.log(others, "99999999999999999999999999999999999999999")
  const newHotel = new Booking(others);
  const savedOrder = await newHotel.save()
  console.log(savedOrder)
}

export const bookings = async (req, res, next) => {
  try {
    const bookingsdata = await Booking.find(req.body)
    res.status(200).json(bookingsdata)
  } catch (err) {
    next(err)
  }
}

export const bookingId = async (req, res, next) => {
  try {
    const { bookingId, userId } = req.body
    const bookingid = await Booking.findOne({ _id: bookingId, userId: userId })
    if (bookingid) {
      return res.status(200).json({ bookingid, status: true, message: "This Booking Id valid" })
    } else {
      return res.status(200).json({ message: "This Booking Id invalid" })
    }
  } catch (err) {
    next(err)
  }
}

export const bookingdates = async (req, res, next) => {
  try {
    console.log("on back endZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");
    const date = []
    const bookingdata = await Booking.find()
    for (let i = 0; i < bookingdata.length; i++) {
      for (let j = 0; j < bookingdata[i].alldates.length; j++) {
        date.push(bookingdata[i].alldates[j])
      }
    }
    console.log(date, "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
    return res.status(200).json({ bookingdata, message: "This dates not available", status: true,date })

  } catch (err) {
    next(err)
  }
}

