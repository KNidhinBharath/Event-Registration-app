import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  event:{type:mongoose.Schema.Types.ObjectId,ref:"Event"},
  status:{type:String,default:"active"}
},{timestamps:true});

export default mongoose.model("Registration",schema);
