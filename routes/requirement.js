const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const isAdminOrDev=require("../middlewares/isAdminOrDev")

const {
 addRequirement,
 deleteRequirement
} = require("../controllers/requirement");

// add new item
router.post("/add/:cid",isAuthenticated,isAdminOrDev,addRequirement);

// delete a item
router.delete("/delete",isAuthenticated,isAdminOrDev,deleteRequirement);

module.exports = router;
