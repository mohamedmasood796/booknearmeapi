
import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routers/auth.js"
import userRoute from "./routers/users.js"
import hotelsRoute from "./routers/hotels.js"
import roomsRoute from "./routers/rooms.js"
import adminRoute from "./routers/admin.js"
import bookingRoute from "./routers/booking.js"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()
dotenv.config()




mongoose.connect(process.env.MONGO_URL)
const connection = mongoose.connection;

connection.on('connected', () => {
  console.log('Database connected')
})

connection.on('error', (error) => {
  console.log('error in MongoDB  connection', error)
});



//middle wares 

app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/admin", adminRoute)
app.use("/api/book", bookingRoute)


app.use((err, req, res, next) => {
  console.log(err)
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Somethig went wrong!"
  return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack,
  })

})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`app is listening to PORT ${PORT}`)
})