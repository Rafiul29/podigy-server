const mongoose=require("mongoose");

const courseSchema=new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User",
  },
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true,
  },
  coverPhoto:{
    type:String,
    required:true,
  },
  video_link:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  },
  instructor:{
    type:String,
    required:true,
  },
  duration:{
    type:Number,
    required:true,
  },
  rating:{
    type:Number,
    required:true,
  },
  numberOfStudents:{
    type:Number,
    required:true,
  },
},{timestamps:true})

module.exports= mongoose.model("Course",courseSchema);