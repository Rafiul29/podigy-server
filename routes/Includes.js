const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const isAdminOrDev=require("../middlewares/isAdminOrDev")

const {
 addIncludes,
 deleteInclues
} = require("../controllers/includes");

// add new item
router.post("/add/:cid",isAuthenticated,isAdminOrDev,addIncludes);

// delete a item
router.delete("/delete",isAuthenticated,isAdminOrDev,deleteInclues);

module.exports = router;
