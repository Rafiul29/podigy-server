const Course = require("../models/courses");
const Video =require("../models/videos")

const addVideo = async (req, res) => {
  try {
    const { module, name, video_link } = req.body;
    if (!module || !name || !video_link) {
      res.json({ message: "filed must be fill" });
      return;
    }
    const {cid}=req.params;
    const findCourse=await Course.findById({_id:cid}); 
    if(!findCourse){
      res.json({ message: "course not found" });
      return;
    }
    // create video
    const video=await Video.create({
      module,
      name,
      video_link,
      user: req.user?._id,
    })
    
    video.courses.push(findCourse._id);
    await video.save();

     // push the  into video into course
     findCourse.videos.push(video._id);
     // resave
     await findCourse.save();

     res.json(video);
     return;
  
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const deleteVideo = async (req, res) => {
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
  addVideo,
  deleteVideo,
};
