const express = require("express");
const router = express.Router();

const isAuthenticated=require("../middlewares/isAuthenticated")
const isAdmin=require("../middlewares/isAdmin");
const isAdminOrDev=require("../middlewares/isAdminOrDev")
const {createSingleCourse,updateCourses,getSingleCourse,deleteSingleCourse,getAllCourses,getAllOwnCourses}=require("../controllers/courses")

// create a new course
router.post('/',isAuthenticated,isAdminOrDev,createSingleCourse);

// update a course
router.put('/:cid',isAuthenticated,isAdminOrDev,updateCourses);

// delete  a course
router.delete('/:cid',isAuthenticated,isAdminOrDev,deleteSingleCourse);

// getAllOwnCourses
router.get("/own-courses",isAuthenticated,isAdminOrDev,getAllOwnCourses)

// get a single course
router.get('/:cid',getSingleCourse);

// getAllcourses
router.get('/',getAllCourses);



module.exports=router
