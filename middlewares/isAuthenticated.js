const User = require("../models/User");
const verifyToken = require("../utils/verifyToken");


const isAuthenticated=async(req,res,next)=>{

  const token=req?.headers?.authorization?.split(" ")[1] 
  console.log({token})
  if(!token){
    res.status(401).json({
      message:"UnAuthorized"
    })
    return
  }

  try{
      const payload=verifyToken(token) 
  
      const user=await User.findById(payload.id);

      if(!user){
        res.status(401).json({
          message:"UnAuthorized"
        })
        return
      }
      req.user=user;
      //  console.log(req.user)
      next();

  }catch(error){
    res.status(401).json({
      message:"UnAuthorized"
    })
    return
  }
  
}

module.exports={isAuthenticated};