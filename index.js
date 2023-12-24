const express= require("express");
const mongoose = require('mongoose');
const cors=require('cors');
const morgan=require("morgan")
require("dotenv").config();
const dbConfig=require("./config/database.config");

const authRoutes=require('./routes/Auth')
const userRoutes=require('./routes/Users');
const coursesRoutes=require('./routes/Courses')
const courseLearnRoutes=require('./routes/courseLearns')
const courseInculesRoutes=require('./routes/courseIncludes')
const courseRequirementRoutes=require("./routes/coursesRequirement");
// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


app.get('/',(req,res)=>{
  res.json({msg:"Welcome to my server"})
})


// database connection
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});


//import and use the  routes files
app.use('/api/auth/public',authRoutes)
app.use('/api/users/private',userRoutes);
app.use('/api/courses/private',coursesRoutes)
app.use('/api/coures/private/learn',courseLearnRoutes)
app.use('/api/coures/private/includes',courseInculesRoutes)
app.use('/api/coures/private/requirement',courseRequirementRoutes)

// server listen
const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})


