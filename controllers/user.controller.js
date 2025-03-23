const userModel=require('../models/user.model.js')
const blacklistTokenModel=require('../models/blacklistToken.model.js')
const userService=require('../services/user.service.js')
const {validationResult}=require('express-validator')

module.exports.registerUser=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    const {fullname,email,password}=req.body
    const checkUser=await userModel.findOne({email})
    if(checkUser){
        return res.status(400).json({message:"User already exists."})
    }
    const hashedPassword=await userModel.hashPassword(password)
    const user=await userService.createUser({
        fullname,
        email,
        password:hashedPassword
    })
    const token=user.generateAuthToken();
    res.status(201).json({token,user:user})
    return res;
}
module.exports.loginUser=async(req,res)=>{
    const errors=validationResult(req)
    const {email,password}=req.body
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const user=await userModel.findOne({email}).select('+password')
    if(!user){
        return res.status(401).json({message:"Invalid email."})
    }
    const isMatched=await user.comparePassword(password)
    if(!isMatched){
        return res.status(401).json({message:"Invalid password."})
    }
    const token=await user.generateAuthToken()
    res.cookie('token',token)
    return res.status(200).json({token,user:user});
}
module.exports.getUserProfile=async(req,res)=>{
    return res.status(200).json({user:req.user})
}
module.exports.logoutUser=async(req,res)=>{{
    res.clearCookie('token')
    const token=req.cookies?.token||req.headers?.authorization.split(' ')[1]
    if(token){
        await blacklistTokenModel.create({token})
    }
    res.status(200).json({message:'User has been logged out.'})
}}