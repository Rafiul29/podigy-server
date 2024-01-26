const { default: mongoose } = require("mongoose");
const Product = require("../models/products");

// create a single course
const createSingleProduct = async (req, res) => {
  const userId = req.user?._id;

  const { title, specification, image_link, cirboard_link, price, reviews } =
    req.body;

  if (
    !title ||
    !specification ||
    !image_link ||
    !cirboard_link ||
    !price ||
    !reviews
  ) {
    res.send({ error: "All flied must be fill" });
    return;
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(404).send({ error: "User Not found" });
      return;
    }

    //CoursesExitsts
    const productExitsts = await Product.find({ title });

    if (productExitsts.length == 1) {
      throw new Error("Product Already exists");
    }

    //create a courses
    const product = await Course.create({ userId, ...req.body });

    //response
    res.json(product);
    return;
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// update a single course
const updateProduct = async (req, res) => {
  try {
    const { title, specification, image_link, cirboard_link, price, reviews } =
      req.body;

    if (
      !title ||
      !specification ||
      !image_link ||
      !cirboard_link ||
      !price ||
      !reviews
    ) {
      throw new Error(
        "Must filled the title, specification,image_link,cirboard_link, price duration"
      );
    }
    const pid = req.params.pid;userId
    if (!mongoose.Types.ObjectId.isValid(pid)) {
      res.status(404).json({ message: "product update not successfully" });
      return;
    }

    await Promise.resolve().then(async () => {
      const updateProduct = await Course.findByIdAndUpdate(
        { _id: pid },
        { ...req.body },
        { new: true }
      );
      res.json(updateProduct);
    });
  } catch (error) {
    res.status(400).json({
      message: "product update not successfully ",
      error: error.message,
    });
  }
};

// get a single course
const getSingleProduct = async (req, res) => {
  const id = req.params.pid;
  if (!mongoose.Types.ObjectId.isValid(pid)) {
    res.status(404).json({ message: "product not found" });
    return;
  }
  try {
    await Promise.resolve().then(async () => {
      const singleCourses = await Course.findById(id)
      res.json(singleCourses);
    });
  } catch (error) {
    res.status(400).json({
      message: "product not found",
      error: error.message,
    });
  }
};

// delete a single course
const deleteSingleProduct = async (req, res) => {
  const id = req.params.pid;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "product not found" });
    return;
  }
  try {
    const course = await Course.findByIdAndDelete(id);
    res.json(course);
  } catch (error) {
    res.status(400).json({
      message: "delete product not successfull",
      error: error.message,
    });
  }
};

// get all course
const getAllProducts = async (req, res) => {
  try {

    const AllProducts=await Product.find({});
      res.json(AllProducts);
    
  } catch (error) {
    res.status(400).json({
      message: "product  not found",
      error: error.message,
    });
  }
};

const getAllOwnProducts = async (req, res) => {
  try {
    const userId = req.user._id;
    await Promise.resolve().then(async () => {
      const getAllOwnProduct = await Product.find({
        userId: req.user._id,
      })
      res.json(getAllOwnProduct);
    });
  } catch (error) {
    res.status(400).json({
      message: "Product not found ",
      error: error.message,
    });
  }
};

module.exports = {
 createSingleProduct,
 updateProduct,
 deleteSingleProduct,
 getAllOwnProducts,
 getAllProducts,
 getSingleProduct
};
