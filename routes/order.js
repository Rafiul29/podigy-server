const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const isAdminOrDev=require("../middlewares/isAdminOrDev")

const {getOrderExistingUser,getAllOrders}=require("../controllers/order");

router.get("/",isAuthenticated,isAdminOrDev,getAllOrders);
// get AllOrders 

// get order existing user
router.get("/user-orders",isAuthenticated,getOrderExistingUser);




module.exports = router;
