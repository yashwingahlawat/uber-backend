const captainModel=require("../models/captain.model.js")
const captainService=require("../services/captain.service.js")
const blacklistTokenModel=require("../models/blacklistToken.model.js")
const {validationResult}=require('express-validator')

module.exports.registerCaptain=async(req,res)=>{
    const errors=validationResult(req)
    
    if(!errors.isEmpty()){
        // console.log(errors.array());
        return res.status(400).json({error:errors.array()})
    }
    // console.log(req.body);
    
    const {fullname,email,password,vehicle}=req.body
    
    const checkCaptain=await captainModel.findOne({email})
    if(checkCaptain){
        // console.log(checkCaptain);
        return res.status(400).json({message:"Captain already exists."})
    }
    const hashedPassword=await captainModel.hashPassword(password)
    const captain=await captainService.createCaptain({
        fullname,
        email,
        password:hashedPassword,
        vehicle
    })
    // console.log(captain);
    
    const token=captain.generateToken()
    res.status(200).json({token,captain:captain})
    return res;
}
module.exports.loginCaptain=async(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body
    const captain=await captainModel.findOne({email}).select('+password')
    if(!captain){
        return res.status(401).json({message:"Invalid email."})
    }
    const checkCaptain=await captain.comparePassword(password)
    if(!checkCaptain){
        return res.status(401).json({message:"Invalid password."})
    }
    const token=await captain.generateToken()
    res.cookie('token',token)
    return res.status(200).json({token,captain:captain});
}

module.exports.getCaptainProfile=async(req,res)=>{
    return res.status(200).json({captain:req.captain})
}

module.exports.logoutCaptain=async(req,res)=>{
    const token=req.cookies?.token||req.headers?.authorization.split(' ')[1]
    res.clearCookie('token')
    if(token){
        await blacklistTokenModel.create({token})
    }
    res.status(200).json({message:'Captain has been logged out.'})
    return res;
}