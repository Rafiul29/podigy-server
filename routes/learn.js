const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const isAdmin = require("../middlewares/isAdmin");
const isAdminOrDev=require("../middlewares/isAdminOrDev")

const {
  addCoursesLearn,
  deleteCoursesLearn,
} = require("../controllers/learn");

// add new item
router.put("/add",isAuthenticated,isAdminOrDev,addCoursesLearn);

// delete a item
router.delete("/delete",deleteCoursesLearn);

module.exports = router;
