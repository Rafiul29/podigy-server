const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const isAdminOrDev=require("../middlewares/isAdminOrDev")

const {
 addCourseRequirement,
 deleteCourseRequirement
} = require("../controllers/coursesRequirement");

// add new item
router.put("/add/:cid",isAuthenticated,isAdminOrDev,addCourseRequirement);

// delete a item
router.delete("/delete",isAuthenticated,isAdminOrDev,deleteCourseRequirement);

module.exports = router;
