const express = require("express");
const router = express.Router();

const isAuthenticated=require("../middlewares/isAuthenticated")
const isAdmin=require("../middlewares/isAdmin")
const {getAnUser,deleteAnUser,updateAnUser,getAnAllUser,userRoleUpdate}=require("../controllers/Users")


// user role update

router.put('/user-role-update',isAuthenticated,isAdmin,userRoleUpdate)

// get an user
router.get("/profile",isAuthenticated, getAnUser);

//update an user
router.put("/update-profile",isAuthenticated,updateAnUser);

// delete  an user
router.delete("/delete-profile",isAuthenticated, deleteAnUser);

// get all  an user
router.get("/",isAuthenticated,isAdmin,getAnAllUser);

module.exports = router;
