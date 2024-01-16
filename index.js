const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const dbConfig = require("./config/database.config");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const coursesRoutes = require("./routes/courses");
const videoRoutes=require("./routes/videos")
const learnRoutes= require("./routes/learns");
const includesRoutes = require("./routes/includes");
const paymentsDetailsRoutes=require("./routes/paymentsDetails")
const requirementRoutes = require("./routes/requirement");
const takeThisCourseRoutes=require("./routes/takeThisCourse")
const categoriesRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripe");
// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to my server" });
});

// database connection
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Databse Connected Successfully!!");
  })
  .catch((err) => {
    console.log("Could not connect to the database", err);
    process.exit();
  });

//import and use the  routes files
app.use("/api/auth/public", authRoutes);
app.use("/api/users/private", userRoutes);
app.use("/api/courses/private", coursesRoutes);
app.use("/api/categories/private", categoriesRoutes);
app.use("/api/private/videos", videoRoutes);
app.use("/api/private/learns", learnRoutes);
app.use("/api/private/includes",includesRoutes);
app.use("/api/private/payments-details",paymentsDetailsRoutes);
app.use("/api/private/requirements", requirementRoutes);
app.use("/api/private/take-this-course", takeThisCourseRoutes);
app.use("/api/orders/private", orderRoutes);
app.use("/api/stripe", stripeRoutes);

// server listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
