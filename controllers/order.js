const Order=require("../models/order")

const getAllOrders = async (req, res) => {
  try {
    await Promise.resolve().then(async () => {
    const orders=await Order.find({}).populate('course userId')
    res.status(200).json(orders);
    });
  } catch (error) {
    res.status(400).json({
      message: "Order not Found",
      error: error.message,
    });
  }
};

const getOrderExistingUser = async (req, res) => {
  try {
    await Promise.resolve().then(async () => {
    const orders=await Order.find({userId:req.user?._id}).populate('course')
    res.status(200).json(orders);
    });
  } catch (error) {
    res.status(400).json({
      message: "course not Found",
      error: error.message,
    });
  }
};

module.exports = {
  getAllOrders,
  getOrderExistingUser,
};
