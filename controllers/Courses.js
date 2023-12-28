const { default: mongoose } = require('mongoose');
const Course=require('../models/Courses');


// create a single course
const createSingleCourse=async(req,res)=>{

  const userId = req.user?._id;

  const {title,description,instructor,coverPhoto,video_link,price,duration,rating,students,helpLines}=req.body;

  if (!title || !description || !instructor || !coverPhoto || !video_link || !price || !duration || !rating || !students || !helpLines) {
    res.json({message:"Must filled the title, description,instructor,coverphoto, video_link price duration rating students helplines"});
    return;
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(404).json({ message: "User Not found" });
      return;
    }
  const title=req.body.title;
    //CoursesExitsts
    const courseExitsts=await Course.find({title});
    
    if(courseExitsts.length==1){
      throw new Error("Course Already exists");
    }

    await Promise.resolve().then(async () => {
      const courses = await Course.create({userId,...req.body});
      res.json(courses);
    });
  } catch (error) {
    res.status(400).json({
      message: "Create a new courses not successfully",
      error: error.message,
    });
  }
}

// update a single course
const updateCourses=async(req,res)=>{
  console.log("first")
  const cid=req.params.cid;
  console.log({...req.body})
  if (!mongoose.Types.ObjectId.isValid(cid)) {
    res.status(404).json({ message: "course update not successfully" });
    return;
  }
  try {
    await Promise.resolve().then(async () => {
      const updateCourses = await Course.findByIdAndUpdate({_id:cid},{...req.body},{new:true});
      res.json(updateCourses);
    });
  } catch (error) {
    res.status(400).json({
      message: "course update not successfully ",
      error: error.message,
    });
  }
}

// get a single course
const getSingleCourse=async(req,res)=>{
  const id=req.params.cid;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "courses not found" });
    return;
  }
  try {
    await Promise.resolve().then(async () => {
      const singleCourses = await Course.findById(id);
      res.json(singleCourses);
    });
  } catch (error) {
    res.status(400).json({
      message: "courses not found",
      error: error.message,
    });
  }
}

// delete a single course
const deleteSingleCourse=async(req,res)=>{
  const id=req.params.cid;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "courses not found" });
    return;
  }
  try {
    await Promise.resolve().then(async () => {
      const deleteCourses = await Course.findByIdAndDelete(id);
      res.json(deleteCourses);
    });
  } catch (error) {
    res.status(400).json({
      message: "delete courses successfull",
      error: error.message,
    });
  }
}

// get all course
const getAllCourses=async(req,res)=>{
  try {
    await Promise.resolve().then(async () => {
      const getallCourses = await Course.find();
      res.json(getallCourses);
    });
  } catch (error) {
    res.status(400).json({
      message: " courses course not found",
      error: error.message,
    });
  }
}


const getAllOwnCourses=async(req,res)=>{
  try {
    console.log("first")
    const userId=req.user._id;
    console.log(userId)
    await Promise.resolve().then(async () => {
      const getAllOwnCourse = await Course.find({userId:req.user._id});
      res.json(getAllOwnCourse);
    });
  } catch (error) {
    res.status(400).json({
      message: " courses course not found",
      error: error.message,
    });
  }
}


module.exports={
  createSingleCourse,
  updateCourses,
  getSingleCourse,
  deleteSingleCourse,
  getAllCourses,
  getAllOwnCourses,
}