const Course=require('../models/Courses');


const addCourseLearn=async(req,res)=>{
  const {courseId,text}=req.body;
if(!text){
  res.json({message:"filed must be fill"});
  return;
}

  try {
    await Promise.resolve().then(async () => {
      const course=await Course.findByIdAndUpdate(courseId,{
        $push:{
          whatYouWillLearns:{
              text,
          }
        }
      },{new:true});
      res.json(course);
    });
  } catch (error) {
    res.status(400).json({
      message: "courses update not successfull",
      error: error.message,
    });
  }
}



const deleteCourseLearn=async(req,res)=>{
  const {learnId,cid}=req.body;
  // const cid= req.params.cid
 console.log(learnId,cid)
  try {
    await Promise.resolve().then(async () => {
      await Course.findOneAndUpdate({_id:cid},{
        $pull:{
          whatYouWillLearns:{_id:learnId},
        }
      });
      const course=await Course.findById({_id:cid})
      res.json(course);
    });

  } catch (error) {
    res.status(400).json({
      message: "courses deleteCourseRequiremcourseent whatYouWillLearns filed update not successfull",
      error: error.message,
    });
  }
}


module.exports={
  addCourseLearn,
  deleteCourseLearn,
}