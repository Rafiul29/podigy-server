const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const isAdminOrDev=require("../middlewares/isAdminOrDev")

const {
 addPaymentsDetails,
 deletePaymentsDetails
} = require("../controllers/paymentsDetails");

// add new item
router.post("/add/:cid",isAuthenticated,isAdminOrDev,addPaymentsDetails);

// delete a item
router.delete("/delete",isAuthenticated,isAdminOrDev,deletePaymentsDetails);

module.exports = router;
