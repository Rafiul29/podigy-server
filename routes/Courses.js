const express = require("express");
const router = express.Router();

const isAuthenticated=require("../middlewares/isAuthenticated")
const isAdmin=require("../middlewares/isAdmin");

const {createSingleCourse,updateCourses,getSingleCourse,deleteSingleCourse,getAllCourses}=require("../controllers/Courses")

// create a new course
router.post('/',isAuthenticated,isAdmin,createSingleCourse);

// update a course
// router.put('/:cid',isAuthenticated,isAdmin,updateCourses);

// delete  a course
// router.delete('/:cid',isAuthenticated,isAdmin,deleteSingleCourse);

// get a single course
router.get('/:cid',getSingleCourse);

// getAllcourses
router.get('/',getAllCourses);


module.exports=router
