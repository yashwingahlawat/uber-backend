const rideService=require('../services/ride.service.js')
const {validationResult}=require('express-validator')

module.exports.createRide=async(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    const {userId,pickup,destination,vehicleType}=req.body
    try{
        const ride=rideService.createRide({user:userId,pickup,destination,vehicleType})
        res.status(201).json(ride)
    }
    catch(error){
        console.error(error)
        res.statuse(500).json({message:error.message})
    }
}