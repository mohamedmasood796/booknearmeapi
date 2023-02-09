
import mongoose from "mongoose"
const {Schema} = mongoose;
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
  email: {
    type: String,
    require:true,
    unique:true
  },
  country:{
    type:String,
  },
  img:{
    type:String,
  },
  city:{
    type:String,
  },
  phone:{
    type:Number,
  },
  password: {
    type: String,
    require:true
  },

  isBlock:{
    type:Boolean,
    default:false 
  },
  verify:{
    type:Boolean,
    default:false
  }
  // verified:{
  //   type:Boolean,
  //   default:false 
  // }
},
{timestamps:true})
export default mongoose.model("User",userSchema)