const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  module: {
    type: Number,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  video_link:{
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
},{timestamps:true});

const Video=mongoose.model("Video",videoSchema);
module.exports=Video;