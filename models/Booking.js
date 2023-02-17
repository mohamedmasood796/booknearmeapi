

import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },

    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    price: Number,
});

export default mongoose.model("booking",bookingSchema)

// const BookingModel = mongoose.model('Booking', bookingSchema);

// module.exports = BookingModel;