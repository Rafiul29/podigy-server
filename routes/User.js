const express = require("express");
const router = express.Router();

const {isAuthenticated}=require("../middlewares/isAuthenticated")
const {getAnUser,deleteAnUser,updateAnUser,getAnAllUser}=require("../controllers/User")


// get an user
router.get("/profile",isAuthenticated, getAnUser);

//update an user
router.put("/update-profile",isAuthenticated,updateAnUser);

// delete  an user
router.delete("/delete-profile",isAuthenticated, deleteAnUser);

// get all  an user
router.get("/",isAuthenticated,getAnAllUser);

module.exports = router;
