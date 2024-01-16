const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const isAdminOrDev=require("../middlewares/isAdminOrDev")

const {
 addTakeThisCourse,
 deleteTakeThisCourse
} = require("../controllers/takeThisCourse");

// add new item
router.post("/add/:cid",isAuthenticated,isAdminOrDev,addTakeThisCourse);

// delete a item
router.delete("/delete",isAuthenticated,isAdminOrDev,deleteTakeThisCourse);

module.exports = router;
