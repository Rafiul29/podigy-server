const Course = require("../models/courses");
const Requirement = require("../models/requirement");

const addRequirement = async (req, res) => {
  try{
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
    const requirement=await Requirement.create({
      title,
      user: req.user?._id,
    })
    
    requirement.courses.push(findCourse._id);
    await requirement.save();

     // push the  into what You Will Learns into course
     findCourse.requirements.push(requirement._id);
     // resave
     await findCourse.save();

     res.json(requirement);
     return;
  
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const deleteRequirement = async (req, res) => {
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
    
    learn.courses.push(findCourse._id);
    await learn.save();

     // push the  into what You Will Learns into course
     findCourse.whatYouWillLearns.push(learn._id);
     // resave
     await findCourse.save();

     res.json(learn);
     return;
  } catch (error) {
    res.status(400).json({
      message: "courses inclues filed delete not successfull",
      error: error.message,
    });
  }
};

module.exports = {
  addRequirement,
  deleteRequirement,
};
