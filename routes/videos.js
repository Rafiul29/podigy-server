const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const isAdminOrDev=require("../middlewares/isAdminOrDev")

const {
addVideo,
deleteVideo
} = require("../controllers/video");

// add new item
router.post("/add/:cid",isAuthenticated,isAdminOrDev,addVideo);

// delete a item
router.delete("/delete",isAuthenticated,isAdminOrDev,deleteVideo);

module.exports = router;
