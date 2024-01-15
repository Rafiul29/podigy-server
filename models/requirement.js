const mongoose = require("mongoose");

const requirementSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
},{timestamps:true});

const Requirement=mongoose.model("Requirement",requirementSchema);
module.exports=Requirement;