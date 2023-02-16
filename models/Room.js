
import mongoose from "mongoose"
const { Schema } = mongoose;
const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        require: true,
    },
    maxPeople: {
        type: Number,
        require: true,
    },
    desc: {
        type: String,
        require: true
    },
    photos:{
        type:[String],
    },

    roomNumbers: [{
        number: Number, 
        unavailableDates: {type:[Date]}
    }],
},
    { timestamps: true }
)


export default mongoose.model("Room", RoomSchema)