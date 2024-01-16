const { default: mongoose } = require("mongoose");
const Course = require("../models/courses");
const Category = require("../models/category");

// create a single course
const createSingleCourse = async (req, res) => {
  const userId = req.user?._id;

  const {
    title,
    description,
    instructor_name,
    instructor_photo,
    thumbnail,
    category,
    price,
    duration,
    rating,
    students,
    helpLines,
  } = req.body;

  if (
    !title ||
    !description ||
    !instructor_name ||
    !instructor_photo ||
    !thumbnail ||
    !category ||
    !price ||
    !duration ||
    !rating ||
    !students ||
    !helpLines
  ) {
    res.send({error:"All flied must be fill"})
    return;
  }
  
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(404).json({ error: "User Not found" });
      return;
    }

    //CoursesExitsts
    const courseExitsts = await Course.find({ title });

    if (courseExitsts.length == 1) {
      throw new Error("Course Already exists");
    }

    // find the category
    const categoryFound = await Category.findOne({
      _id: category,
    });

    if (!categoryFound) {
      throw new Error(
        "Category not found, please create category first ir check category name"
      );
    }

    //create a courses
    const course = await Course.create({ userId, ...req.body });

    // push the product into category
    categoryFound.courses.push(course._id);
    // resave
    await categoryFound.save();
    res.json(course);
    return;
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// update a single course
const updateCourses = async (req, res) => {
  try {
    const {
      title,
      description,
      instructor_name,
      instructor_photo,
      thumbnail,
      category,
      price,
      duration,
      rating,
      students,
      helpLines,
    } = req.body;

    if (
      !title ||
      !description ||
      !instructor_name ||
      !instructor_photo ||
      !thumbnail ||
      !category ||
      !price ||
      !duration ||
      !rating ||
      !students ||
      !helpLines
    ) {
      throw new Error(
        "Must filled the title, description,instructor,coverphoto, video_link price duration rating students helplines"
      );
    }
    const cid = req.params.cid;
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      res.status(404).json({ message: "course update not successfully" });
      return;
    }

    await Promise.resolve().then(async () => {
      const updateCourses = await Course.findByIdAndUpdate(
        { _id: cid },
        { ...req.body },
        { new: true }
      );
      res.json(updateCourses);
    });
  } catch (error) {
    res.status(400).json({
      message: "course update not successfully ",
      error: error.message,
    });
  }
};

// get a single course
const getSingleCourse = async (req, res) => {
  const id = req.params.cid;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "courses not found" });
    return;
  }
  try {
    await Promise.resolve().then(async () => {
      const singleCourses = await Course.findById(id).populate("category");
      res.json(singleCourses);
    });
  } catch (error) {
    res.status(400).json({
      message: "courses not found",
      error: error.message,
    });
  }
};

// delete a single course
const deleteSingleCourse = async (req, res) => {
  const id = req.params.cid;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "courses not found" });
    return;
  }
  try {
    const course = await Course.findByIdAndDelete(id);
    console.log(course._id);
    // delete category model course  id
    await Category.findOneAndUpdate(course.category, {
      $pull: {
        courses: course._id,
      },
    });
    res.json(course);
  } catch (error) {
    res.status(400).json({
      message: "delete courses successfull",
      error: error.message,
    });
  }
};

// get all course
const getAllCourses = async (req, res) => {
  try {
    // query
    let courseQuery = Course.find();
    //filter by name
    if (req.query.title) {
      courseQuery = courseQuery.find({
        title: { $regex: req.query.title, $options: "i" },
      });
    }

    // filter by category
    const categoryId = req.query.categoryId;
    if (categoryId) {
      courseQuery = courseQuery.find({ category: categoryId });
    }

    await Promise.resolve().then(async () => {
      const getallCourses = await courseQuery.populate("category videos whatYouWillLearns thisCourseIncludes requirements whoShouldTakeThisCourse payments");
      res.json(getallCourses);
    });
  } catch (error) {
    res.status(400).json({
      message: " courses course not found",
      error: error.message,
    });
  }
};

const getAllOwnCourses = async (req, res) => {
  try {
    const userId = req.user._id;
    await Promise.resolve().then(async () => {
      const getAllOwnCourse = await Course.find({
        userId: req.user._id,
      }).populate("category");
      res.json(getAllOwnCourse);
    });
  } catch (error) {
    res.status(400).json({
      message: " courses course not found",
      error: error.message,
    });
  }
};

module.exports = {
  createSingleCourse,
  updateCourses,
  getSingleCourse,
  deleteSingleCourse,
  getAllCourses,
  getAllOwnCourses,
};
