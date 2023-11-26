const express = require("express");
const router = express.Router();

const isAuthenticated=require("../middlewares/isAuthenticated")
const isAdmin=require("../middlewares/isAdmin");


// create a new course
router.post('/',);

// update a course
router.put('/:cid',);

// delete  a course
router.delete('/:cid',);

// get a single course
router.get('/:cid',);

// getAllcourses
router.get('/',);


module.exports=router
