const mongoose = require("mongoose");

const learnSchema = new mongoose.Schema({
  title:{
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

const Learn=mongoose.model("Learn",learnSchema);
module.exports=Learn;