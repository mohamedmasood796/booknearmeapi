import mongoose from "mongoose";

const CitySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
   
    imageUrl:{
        type:String,
        require:true
    }
})

export default mongoose.model("City",CitySchema)