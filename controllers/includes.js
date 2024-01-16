const Course = require("../models/courses");
const Include = require("../models/includes");

const addIncludes = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      res.json({ message: "filed must be fill" });
      return;
    }
    const { cid } = req.params;
    const findCourse = await Course.findById({ _id: cid });
    if (!findCourse) {
      res.json({ message: "course not found" });
      return;
    }
    // create video
    const include = await Include.create({
      title,
      user: req.user?._id,
      courseId:findCourse._id
    });
  // push the  include into course
  findCourse.thisCourseIncludes.push(include._id);
    // resave
    await findCourse.save();

    res.json(include);
    return;
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const deleteInclues = async (req, res) => {
  const { inclueId, cid } = req.body;

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
            thisCourseIncludes: { _id: inclueId },
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
  addIncludes,
  deleteInclues,
};
