const User = require("../models/Users");
const mongoose = require("mongoose");

// userRoleUpdate
const userRoleUpdate = async (req, res) => {
  try {
    const { userId, role } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    await Promise.resolve().then(async () => {
      const user = await User.findByIdAndUpdate(
        userId,
        { role },
        { new: true }
      );
      res.json(user);
    });

  } catch (error) {
    res.status(400).json({
      message: "user not found",
    });
  }
};


// get an user
const getAnUser = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    await Promise.resolve().then(async () => {
      const user = await User.findById(userId);
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(400).json({
      message: "user not found",
    });
  }
};

// update and user
const updateAnUser = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, address } = req.body;
    const userId = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    await Promise.resolve().then(async () => {
      const user = await User.findByIdAndUpdate(
        userId,
        { fullName, phoneNumber, email, address },
        { new: true }
      );
      res.json(user);
    });
  } catch (error) {
    res.status(400).json({
      message: "user not found",
      error: error.message,
    });
  }
};

// delete an user
const deleteAnUser = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    await Promise.resolve().then(async () => {
      const user = await User.findByIdAndDelete(userId);
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(400).json({
      message: "user not found",
    });
  }
};

// get an user
const getAnAllUser = async (req, res) => {
  try {
    await Promise.resolve().then(async () => {
      const user = await User.find({});
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(400).json({
      message: "user not found",
    });
  }
};

module.exports = { getAnUser, deleteAnUser, updateAnUser, getAnAllUser,userRoleUpdate };
