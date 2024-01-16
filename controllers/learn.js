const Course = require("../models/courses");
const Learn =require("../models/learn")
const addLearn = async (req, res) => {
  try {
    const { title} = req.body;
    if (!title) {
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
    const learn=await Learn.create({
      title,
      user: req.user?._id,
    })
    

     // push the  into what You Will Learns into course
     findCourse.whatYouWillLearns.push(learn._id);
     // resave
     await findCourse.save();

     res.json(learn);
     return;
  
  } catch (error) {
    res.status(400).json({
      message: "courses update not successfull",
      error: error.message,
    });
  }
};

const deleteLearn = async (req, res) => {
  const { learnId, cid } = req.body;
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
            whatYouWillLearns: { _id: learnId },
          },
        }
      );
      const course = await Course.findById({ _id: cid });
      res.json(course);
    });
  } catch (error) {
    res.status(400).json({
      message:
        "courses deleteCourseRequiremcourseent whatYouWillLearns filed update not successfull",
      error: error.message,
    });
  }
};

module.exports = {
  addLearn,
  deleteLearn,
};
