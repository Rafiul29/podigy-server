// internal import
const Category = require("../models/category");
const { default: mongoose } = require("mongoose");


const createCategory = async (req, res) => {
  try {
    const { name,image } = req.body;

    if (!name || !image) {
      throw new Error("Filed must be fill");
    }

    // category exists
    const categoryFound = await Category.findOne({ name });

    if (categoryFound) {
      throw new Error("Category already exists1");
    }

    // create category
    const category = await Category.create({
      name,
      image,
      user: req.user?._id,
    });
    res.json(category);
    return;
  } catch (error) {
    res.json({
      status: "failed",
      message: error.message,
    });
  }
};


const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({}).populate("courses");
    res.json(categories);
  } catch (error) {
    res.json({
      status: "faild",
      message: error.message,
    });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const cid = req.params.cid;

    if (!mongoose.Types.ObjectId.isValid(cid)) {
      res.status(404).json({ message: "category id not found" });
      return;
    }

    const category = await Category.findById({ _id: cid }).populate("courses");
    res.json(category);
  } catch (error) {
    res.json({
      status: "failed",
      message: error.message,
    });
  }
};


const updateSingleCategory = async (req, res) => {
  try {
    const { name,image } = req.body;
    const cid = req.params.cid;

    if (!name || !image) {
      throw new Error("Field must be fill");
    }
    //check mogoose id
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      res.status(404).json({ message: "category id not found" });
      return;
    }
    // update
    const category = await Category.findByIdAndUpdate(
      { _id: cid },
      { name,image },
      { new: true }
    );

    res.json(category);
  } catch (error) {
    res.json({
      status: "failed",
      message: error.message,
    });
  }
};


const deleteSingleCategory = async (req, res) => {
  try {
    const cid = req.params.cid;

    if (!mongoose.Types.ObjectId.isValid(cid)) {
      res.status(404).json({ message: "category id not found" });
      return;
    }

    const categoryExistingCourse = await Category.findById({ _id: cid });
    if (categoryExistingCourse?.courses.length !== 0) {
      throw new Error("Existing Category Courses must be delete");
    }

    const category = await Category.findByIdAndDelete({ _id: cid });
    res.json(category);
  } catch (error) {
    res.json({
      status: "failed",
      message: error.message,
    });
  }
};
const getAllOwnCategories = async (req, res) => {
  try {
    const userId = req.user._id;
  
    await Promise.resolve().then(async () => {
      const getAllOwnCourse = await Category.find({ user: req.user._id });
      res.json(getAllOwnCourse);
    });
  } catch (error) {
    res.status(400).json({
      message: "category not found",
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateSingleCategory,
  deleteSingleCategory,
  getAllOwnCategories
};
