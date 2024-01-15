const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const isAdmin = require("../middlewares/isAdmin");
const isAdminOrDev=require("../middlewares/isAdminOrDev")

const {
  addLearn,
  deleteLearn,
} = require("../controllers/learn");

// add new item
router.post("/add/:cid",isAuthenticated,isAdminOrDev,addLearn);

// delete a item
router.delete("/delete",isAuthenticated,isAdminOrDev,deleteLearn);

module.exports = router;
