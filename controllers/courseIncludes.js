const Course = require("../models/Courses");

const addCourseIncludes = async (req, res) => {
  const { courseId, text } = req.body;
  if (!text) {
    res.json({ message: "filed must be fill" });
    return;
  }
  const vaildcourse = await Course.find({ _id: courseId });
  const userId = req.user?._id;

  if (vaildcourse[0]?.userId.toString() !== userId.toString()) {
    res.status(400).json({ message: "permission denied" });
    return;
  }
  try {
    await Promise.resolve().then(async () => {
      const courseInclues = await Course.findByIdAndUpdate(
        courseId,
        {
          $push: {
            thisCourseIncludes: {
              text,
            },
          },
        },
        { new: true }
      );
      res.json(courseInclues);
    });
  } catch (error) {
    res.status(400).json({
      message: "courses incules filed  add not successfull",
      error: error.message,
    });
  }
};

const deleteCourseInclues = async (req, res) => {
  const { incluesId, cid } = req.body;

  const vaildcourse = await Course.find({ _id: cid });
  const userId = req.user?._id;

  if (vaildcourse[0]?.userId.toString() !== userId.toString()) {
    res.status(400).json({ message: "permission denied" });
    return;
  }

  try {
    await Promise.resolve().then(async () => {
      await Course.findOneAndUpdate(
        { _id: cid },
        {
          $pull: {
            thisCourseIncludes: { _id: incluesId },
          },
        }
      );
      const course = await Course.findById({ _id: cid });
      res.json(course);
    });
  } catch (error) {
    res.status(400).json({
      message: "courses inclues filed delete not successfull",
      error: error.message,
    });
  }
};

module.exports = {
  addCourseIncludes,
  deleteCourseInclues,
};
