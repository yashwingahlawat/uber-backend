const rideService=require('../services/ride.service.js')
const {validationResult}=require('express-validator')

module.exports.createRide=async(req,res,next)=>{
    const errors=validationResult(req)
    // console.log(req.body);
    // console.log(req.user._id);
    
    if(!errors.isEmpty()){
        // console.log(errors.array());
        
        return res.status(400).json({error:errors.array()})
    }
    const {pickup,destination,vehicleType}=req.body
    // console.log(pickup,destination,vehicleType);
    
    try{
        const ride=await rideService.createRide({user:req.user._id,pickup,destination,vehicleType})
        // console.log(ride);
        
        res.status(201).json(ride)
    }
    catch(error){
        // console.error(error)
        res.statuse(500).json({message:error.message})
    }
}