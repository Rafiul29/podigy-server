const mongoose = require("mongoose");

const takeThisCourseSchema = new mongoose.Schema(
  {
    title: {
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
  },
  { timestamps: true }
);

const TakeThisCourse = mongoose.model("TakeThisCourse", takeThisCourseSchema);
module.exports = TakeThisCourse;
