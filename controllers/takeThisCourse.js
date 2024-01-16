const Course = require("../models/courses");
const TakeThisCourse = require("../models/takeThisCourse");

const addTakeThisCourse = async (req, res) => {

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
    // create take this course
    const takeThiscourse=await TakeThisCourse.create({
      title,
      user: req.user?._id,
      courseId:findCourse._id
    })
    
     // push the  into what You Will Learns into course
     findCourse.whoShouldTakeThisCourse.push(takeThiscourse._id);
     // resave
     await findCourse.save();
     res.json(takeThiscourse);
     
     return;
  
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const deleteTakeThisCourse  = async (req, res) => {
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
  addTakeThisCourse,
  deleteTakeThisCourse,
};
