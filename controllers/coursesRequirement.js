const Course=require('../models/Courses');


const addCourseRequirement=async(req,res)=>{
  const {courseId,text}=req.body;
if(!text){
  res.json({message:"filed must be fill"});
  return;
}

  try {
    await Promise.resolve().then(async () => {
      const course=await Course.findByIdAndUpdate(courseId,{
        $push:{
          requirements:{
              text,
          }
        }
      },{new:true});
      res.json(course);
    });
  } catch (error) {
    res.status(400).json({
      message: "courses incules filed  add not successfull",
      error: error.message,
    });
  }
}

const deleteCourseRequirement=async(req,res)=>{
  const {requirementId,cid}=req.body;
 
  try {
    await Promise.resolve().then(async () => {
      await Course.findOneAndUpdate({_id:cid},{
        $pull:{
          requirements:{_id:requirementId},
        }
      });
      const course=await Course.findById({_id:cid})
      res.json(course);
    });

  } catch (error) {
    res.status(400).json({
      message: "courses inclues filed delete not successfull",
      error: error.message,
    });
  }
}

module.exports={
  addCourseRequirement,
  deleteCourseRequirement,
}