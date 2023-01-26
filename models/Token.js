// import mongoose from "mongoose";
// const Schema=mongoose.Schema;

// const tokenSchema=new Schema({
//     userId:{
//         type:Schema.Types.ObjectId,
//         required:true,
//         ref:"user",
//         unique:true,
//     },
//     token:{
//         type:String,
//         required:true
//     },
//     createdAt:{typel:Date,default:Date.now(),expires:3600}//1 hour

// })
// export default mongoose.model("token",tokenSchema);