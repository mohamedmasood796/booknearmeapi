

import mongoose, { Schema } from 'mongoose'

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    // room:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true
    // },
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    // maxPeople:{
    //     type:Number,
    //     require:true
    // },
    desc: {
        type: String,
        require: true
    },
    photos: {
        type: [String],
    },

    // bookeddays:[
    //     {
    //         roomId:{
    //             type:Schema.Types.ObjectId
    //         },
    //         unavailableDates:[String]
    //     }
    // ],
    roomId: {
        type: Schema.Types.ObjectId
    },
    alldates: {
        type: [String]
    },

    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    // name: {
    //     type: String,
    //     required: true
    // },
    // phone: {
    //     type: String,
    //     required: true
    // },
    // numberOfGuests:{
    //     type:Number,
    //     require:true
    // },
    numberOfNights: {
        type: Number,
        require: true
    },
    statusChange: {
        type: String,
        require: true
    }
}, {timestamps:true});

export default mongoose.model("booking", bookingSchema)

// const BookingModel = mongoose.model('Booking', bookingSchema);

// module.exports = BookingModel;