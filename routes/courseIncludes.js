const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const isAdminOrDev=require("../middlewares/isAdminOrDev")

const {
 addCourseIncludes,
 deleteCourseInclues
} = require("../controllers/courseIncludes");

// add new item
router.put("/add",isAuthenticated,isAdminOrDev,addCourseIncludes);

// delete a item
router.delete("/delete",isAuthenticated,isAdminOrDev,deleteCourseInclues);

module.exports = router;
