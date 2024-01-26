const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");
const isAdminOrDev = require("../middlewares/isAdminOrDev");
const {
  createSingleProduct,
  updateProduct,
  deleteSingleProduct,
  getAllOwnProducts,
  getSingleProduct,
  getAllProducts,
} = require("../controllers/products");

// create a new course
router.post("/", isAuthenticated, isAdminOrDev, createSingleProduct);

// update a course
router.put("/:pid", isAuthenticated, isAdminOrDev, updateProduct);

// delete  a course
router.delete("/:pid", isAuthenticated, isAdminOrDev, deleteSingleProduct);

// getAllOwnCourses
router.get("/own-product", isAuthenticated, isAdminOrDev, getAllOwnProducts);

// get a single course
router.get("/:pid", getSingleProduct);

// getAllcourses
router.get("/", getAllProducts);

module.exports = router;
