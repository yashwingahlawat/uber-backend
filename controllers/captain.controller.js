const captainModel=require("../models/captain.model.js")
const captainService=require("../services/captain.service.js")
const {validationResult}=require('express-validator')

module.exports.registerCaptain=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    const {fullname,email,password,vehicle}=req.body
    const checkCaptain=await captainModel.findOne({email})
    if(checkCaptain){
        return res.status(400).json({message:"Captain already exists."})
    }
    const hashedPassword=await captainModel.hashPassword(password)
    const captain=await captainService.createCaptain({
        fullname,
        email,
        password:hashedPassword,
        vehicle
    })
    const token=captain.generateToken()
    res.status(200).json({token,captain:captain.email})
    return res;
}