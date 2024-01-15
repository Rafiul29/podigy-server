const mongoose = require("mongoose");

const includesSchema = new mongoose.Schema({
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

const Include=mongoose.model("Include",includesSchema);
module.exports=Include;