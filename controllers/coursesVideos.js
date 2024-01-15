const Course = require("../models/courses");

const addCourseVideo = async (req, res) => {
  const { module, name, video_link } = req.body;
  const {cid}=req.params;
  if (!module || !name || !video_link) {
    res.json({ message: "filed must be fill" });
    return;
  }
  const vaildcourse = await Course.find({ _id: cid });
  const userId = req.user?._id;

  if (vaildcourse[0]?.userId.toString() !== userId.toString()) {
    res.status(400).json({ message: "permission denied" });
    return;
  }

  try {
    await Promise.resolve().then(async () => {
      const courseVideo = await Course.findByIdAndUpdate(
        cid,
        {
          $push: {
            videos:{
              module,
              name,
              video_link,
            },
          },
        },
        { new: true }
      );
      res.json(courseVideo);
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const deleteCourseVideo = async (req, res) => {
  const { videoId, cid } = req.body;

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
            videos: { _id: videoId },
          },
        }
      );
      const course = await Course.findById({ _id: cid });
      res.json(course);
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  addCourseVideo,
  deleteCourseVideo,
};
