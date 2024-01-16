const mongoose = require("mongoose");

const paymentsDetailsSchema = new mongoose.Schema(
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

const paymentsDetails = mongoose.model("PaymentsDetail", paymentsDetailsSchema);
module.exports = paymentsDetails;
