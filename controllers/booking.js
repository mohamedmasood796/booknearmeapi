import express from "express";
import Stripe from 'stripe';
import jwt from "jsonwebtoken";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

import Booking from "../models/Booking.js"

export const booking = async (req, res, next) => {

  const { ...product } = req.body;
  const alldates = product.newOrder.alldates
  const numberOfNights = product.newOrder.numberOfNights
  const checkIn = product.newOrder.checkIn
  const checkOut = product.newOrder.checkOut
  const { _id, ...datas } = product.newOrder.oneroom
  const roomId = _id
  const statusChange="Booked"
  const tokenData = {
    roomId, ...datas, alldates, numberOfNights, checkIn, checkOut,statusChange
  }


  // create jwt token
  const token = jwt.sign(tokenData, process.env.JWT)

  const unitAmount = parseInt(tokenData.price * 100);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: product.newOrder.oneroom.title,
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
  // let insideobj = verify.newOrder
  // const newarr = { ...insideobj, userId }
  // const { _id, ...others } = newarr
  const others = { userId, ...verify }
  const newHotel = new Booking(others);
  const savedOrder = await newHotel.save()
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
    const date = []
    const bookingdata = await Booking.find()
    for (let i = 0; i < bookingdata.length; i++) {
      for (let j = 0; j < bookingdata[i].alldates.length; j++) {
        date.push(bookingdata[i].alldates[j])
      }
    }
    return res.status(200).json({ bookingdata, message: "This dates not available", status: true, date })

  } catch (err) {
    next(err)
  }
}

export const checkavailability = async (req, res, next) => {


  const alldates = req.body.alldates
  try {
    const findUser = await Booking.find({ roomId: req.body.roomId })
    const date = []
    if (findUser) {
      // const bookingdata = await Booking.find()

      for (let i = 0; i < findUser.length; i++) {
        for (let j = 0; j < findUser[i].alldates.length; j++) {
          date.push(findUser[i].alldates[j])
        }
      }
    }
    const foundDates = []
    for (const date1 of alldates) {
      for (const date2 of date) {
        if (date1 == date2) {
          foundDates.push(date1);
          break; // break out of inner loop if a match is found
        }

      }
    }
    if (foundDates.length > 0) {
      return res.status(200).json({ message: "This dates not available", status: false })
    } else {
      return res.status(200).json({ message: "Date is available", status: true })
    }
  } catch (err) {
    next(err)
  }
}








