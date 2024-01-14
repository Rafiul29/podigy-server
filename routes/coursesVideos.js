const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const isAdminOrDev=require("../middlewares/isAdminOrDev")

const {
addCourseVideo,
deleteCourseVideo
} = require("../controllers/coursesVideos");

// add new item
router.put("/add/:cid",isAuthenticated,isAdminOrDev,addCourseVideo);

// delete a item
router.delete("/delete",isAuthenticated,isAdminOrDev,deleteCourseVideo);

module.exports = router;
