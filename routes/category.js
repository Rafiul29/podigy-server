const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategory,
  updateSingleCategory,
  deleteSingleCategory,
  getSingleCategory,
  getAllOwnCategories,
} = require("../controllers/category");

const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdminOrDev = require("../middlewares/isAdminOrDev");

// create a course category;
router.post("/", isAuthenticated, isAdminOrDev, createCategory);

// delete  a catgory
router.delete("/:cid", isAuthenticated, isAdminOrDev, deleteSingleCategory);

// update single category
router.put("/:cid", isAuthenticated, isAdminOrDev, updateSingleCategory);



// getAllOwnCourses
router.get("/own-category", isAuthenticated, isAdminOrDev, getAllOwnCategories);

// get single category
router.get("/:cid", getSingleCategory);

// get all categories
router.get("/", getAllCategory);

module.exports = router;
