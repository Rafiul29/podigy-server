const mongoose=require("mongoose");

const courseSchema=new mongoose.Schema({
  userId:{
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
  instructor_name:{
    type:String,
    required:true,
  },
  instructor_photo:{
    type:String,
    required:true,
  },
  thumbnail:{
    type:String,
    required:true,
  },
  video_link:{
    type:String,
    required:true,
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Category",
  },
  price:{
    type:Number,
    required:true,
  },
  duration:{
    type:Number,
    required:true,
  },
  whatYouWillLearns:[
    {
      text:String,
    }
  ],
  thisCourseIncludes:[
    {
      text:String,
    }
  ],
  requirements:[
    {
      text:String,
    }
  ],
  rating:{
    type:Number,
    required:true,
  },
  students:{
    type:Number,
    required:true,
  },
  helpLines:{
    type:String,
    required:true,
  },
},{timestamps:true})

module.exports= mongoose.model("Course",courseSchema);