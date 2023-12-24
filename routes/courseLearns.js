const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const isAdmin = require("../middlewares/isAdmin");
const isAdminOrDev=require("../middlewares/isAdminOrDev")

const {
  addCourseLearn,
  deleteCourseLearn,
} = require("../controllers/courseLearns");

// add new item
router.put("/add",isAuthenticated,isAdminOrDev,addCourseLearn);

// delete a item
router.delete("/delete",isAuthenticated,isAdminOrDev,deleteCourseLearn);

module.exports = router;
