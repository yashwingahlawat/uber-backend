const userModel=require("../models/user.model.js")
const captainModel=require("../models/captain.model.js")
const blacklistTokenModel=require("../models/blacklistToken.model.js")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const dotenv=require("dotenv")
dotenv.config()

module.exports.authUser=async(req,res,next)=>{
    // console.log(req.headers.authorization.split(' ')[1]);
    
    const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
    // const token=req.cookies.token||req.headers.Authorization.split(' ')[1]
    // console.log(token);
    const validate=await blacklistTokenModel.findOne({token})
    if(!token || validate){
        return res.status(401).json({message:"Unauthorized Acess"})
    }
    try{
        const decoded=await jwt.verify(token,process.env.JWT_SECRET)
        // console.log(decoded);
        
        const user=await userModel.findById(decoded._id)
        // console.log(user);
        
        if(!user){
            // console.log(1);
            
            return res.status(401).json({message:"Unauthorized Acess"})
        }
        req.user=user
        // console.log(req.user);
        
        return next()
    }
    catch(error){
        return res.status(401).json({message:"Unauthorized Acess"})
    }
}

module.exports.authCaptain=async(req,res,next)=>{
    const token=req.cookies?.token||req.headers?.authorization?.split(' ')[1]
    const validate=await blacklistTokenModel.findOne({token})
    if(!token || validate){
        return res.status(401).json({message:"Unauthorized Acess"})
    }
    try{
        const decoded=await jwt.verify(token,process.env.JWT_SECRET)
        const captain=await captainModel.findById(decoded._id)
        if(!captain){
            return res.status(401).json({message:"Unauthorized Acess"})
        }
        req.captain=captain
        return next()
    }
    catch(error){
        return res.status(401).json({message:"Unauthorized Acess"})
    }
}