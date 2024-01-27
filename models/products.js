const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    image_link: {
      type: String,
      required: true,
    },
    specification: {
      type: String,
      required: true,
    },
    circuitboard_link: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    reviews: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
