

import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true
    // },
    // room:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true
    // },
    title:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    maxPeople:{
        type:Number,
        require:true
    },
    desc:{
        type:String,
        require:true
    },
    photos:{
        type:[String],
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
    numberOfGuests:{
        type:Number,
        require:true
    },
    numberOfNights:{
        type:Number,
        require:true
    }
});

export default mongoose.model("booking",bookingSchema)

// const BookingModel = mongoose.model('Booking', bookingSchema);

// module.exports = BookingModel;