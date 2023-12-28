const express = require("express");
const router = express.Router();

const {userLogin,userRegistration}=require("../controllers/auth")

// register
router.post("/register",userRegistration);

// register
router.post("/login",userLogin);

module.exports = router;