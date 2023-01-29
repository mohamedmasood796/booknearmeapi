
import mongoose from "mongoose"
const {Schema} = mongoose;
const adminSchema = new mongoose.Schema({

  email: {
    type: String,
    unique:true
  },
  password: {
    type: String,
    require:true
  },

},
{timestamps:true})
export default mongoose.model("Admin",adminSchema)