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
  videos:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
    required:true,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Learn",
    },
  ],
  thisCourseIncludes:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Include",
    },
  ],
  requirements:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requirement",
    },
  ],
  whoShouldTakeThisCourse:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TakeThisCourse",
    },
  ],
  payments:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentsDetail",
    },
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