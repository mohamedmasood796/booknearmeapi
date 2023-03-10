import Admin from "../models/Admin.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js"
import Booking from "../models/Booking.js";

dotenv.config()

//login
export const adminlogin = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email })
    if (!admin) return res.json({ status: false, message: "admin not found" })
    // next(createError(404, "User not found !"))

    const isPasswordCorrect = await bcrypt.compare(req.body.password, admin.password)
    if (!isPasswordCorrect) return res.json({ status: false, message: "wrong password or username" })
    // next(createError(400, "Wrong password or username"))

    const token = await generateToken({ id: admin._id.toString() });

    // const { password, isAdmin, ...otherDetails } = user._doc;
    res.cookie("access_token", token, { httpOnly: true, }).status(200).json({ token, status: true, message: 'admin logined' })
    // res.status(200).json({...otherDetails}) 
  } catch (err) {
    next(err)
  }
}

export const changeStatus = (req, res, next) => {
  const { Status, e } = req.body;
  try {
    void User
      .updateOne(
        { _id: e },
        {
          $set: {
            isBlock: Status,
          },
        }
      )
      .then((date) => {
        res.status(200).send({ Status: true });
      });
  } catch (err) {
    next(err)
  }
};


// export const paymentChart = async (req, res, next) => {
//   const currentDate = new Date();
//   const previousYear = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
//   const oneYearAgo = new Date(previousYear)
//   const total = await Booking.aggregate([
//     // {
//     //   $project: {
//     //     roomTotal: { $multiply: ["$price", "$numberOfNights"] }
//     //   }
//     // },
//     // {
//     //   $group: {
//     //     _id: null,
//     //     total: { $sum: "$roomTotal" }
//     //   }
//     // },
//     {
//       $match: {
//         $and: [
//           { createdAt: { $lt: currentDate } },
//           { createdAt: { $gt: oneYearAgo } }
//         ]
//       }
//     },
//     {
//       $project: {
//         roomTotal: { $multiply: ["$price", "$numberOfNights"] },
//         createdAt: 1
//       }
//     },
//     {
//       $group: {
//         _id: { $month: "$createdAt" },
//         total_price: { $sum: "$roomTotal" }
//       }
//     },
//     {
//       $sort: { _id: 1 }
//     },

//   ])
//   return res.status(200).send({ status: true, total })
// }

export const paymentChart = async (req, res, next) => {
  
  try {
    const bookings = await Booking.aggregate([
      // {
      //   $match: {
      //     status: 'paid',
      //   },
      // },
    

      {
        $project: {
          roomTotal: { $multiply: ["$price", "$numberOfNights"] },
          createdAt: 1
        }
      },
      {
        $group: {
          _id: { 
            $dateToString: { format: '%Y-%m', date: '$createdAt' },
           },
          totalRoom: { $sum: "$roomTotal" }
        }
      },
      // {
      //   $group: {
      //     _id: {
      //       $dateToString: { format: '%Y-%m', date: '$createdAt' },
      //     },
      //     // revenue: {
      //     //   $sum: '$total',
      //     // },
      //   },
      // },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const months = bookings.map(booking => booking._id);
    const revenue = bookings.map(booking => booking.totalRoom);
    res.json({ months, revenue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}



// export const bookingChart = async (req, res, next) => {
//   const check = new Date()
//   var currentDate = new Date();
//   var sevenWeeksAgo = new Date(currentDate.getTime() - (7 * 7 * 24 * 60 * 60 * 1000));
//   const total = await Booking.aggregate([



//     {
//       $match: {
//         $and: [
//           // { checkIn: { $lt: currentDate } },
//           // { checkIn: { $gt: sevenWeeksAgo } }

//           { createdAt: { $lt: currentDate } },
//           { createdAt: { $gt: sevenWeeksAgo } }
//         ]
//       }
//     },
//     // {
//     //   $project: {
//     //     roomTotal: { $sum: ["$price", "$numberOfNights"] },
//     //     checkIn: 1
//     //   }
//     // },
//     // {
//     //   $group: {
//     //     _id: { $week: "$createdAt" },
//     //     total_price: { $sum: "$price" }
//     //   }
//     // },
//     {
//       $group: {
//         _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
//         count: { $sum: 1 }

//       }
//     },
//     {
//       $limit: 7
//     }


//   ])
//   console.log(total, "KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
//   return  res.status(200).send({ status: true, total})
// }

export const bookingChart = async (req, res, next) => {
  try {
    const result = await Booking.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m', date: '$createdAt' },
          },
          bookings: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    const months = result.map(booking => booking._id);
    const booking = result.map(booking => booking.bookings);
    console.log(booking, months, "MMMMMMMMMMMMMMMMMMMMMMMMMMMMMM")
    res.json({ months, booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}





export const bookingDetails = async (req, res, next) => {
  try {
    const data = await Booking.find().populate("userId")
    return res.status(200).send(data)
  } catch (err) {
    next(err)
  }
}

export const cancleBooking=async(req,res,next)=>{
  console.log(req.params.id,"it is idsssssssssssssssssssssssss")
  try {
    const data = await Booking.findOne({_id:req.params.id})
      if(data.statusChange==="Booked"){
        data.statusChange="Canceled"
      }
      data.save()
  } catch (err) {
    next(err)
  }
}