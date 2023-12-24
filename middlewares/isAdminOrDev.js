const User = require("../models/Users");

const isAdminOrDev=async(req,res,next)=>{
  const userId = req.user?._id;
  const user=await User.findOne(userId);
          if(user?.role==="admin" || user?.role==="dev"){
            next();
          }else{
            res.status(403).json({
              message:"Forbidden"
            })
            return;
          }
  }
  
  module.exports=isAdminOrDev;