const User = require("../models/User");

const isAdmin=async(req,res,next)=>{
  const userId = req.user?._id;
  const user=await User.findOne(userId);
          if(user?.role=="admin"){
            next();
          }else{
            res.status(403).json({
              message:"Forbidden"
            })
            return
          }
  }
  
  module.exports=isAdmin;