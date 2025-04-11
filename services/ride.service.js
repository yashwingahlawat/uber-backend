const rideModel=require('../models/ride.model.js')
const mapService=require('../services/maps.service.js')
const crypto=require('crypto')
module.exports.createRide=async ({user,pickup,destination,vehicleType}) => {
    if(!user || !pickup || !destination || !vehicleType)
        throw new Error('All fields are required.')
    const fare=await getFare(pickup,destination)
    const ride=await rideModel.create({
        user,
        pickup,
        destination,
        otp:getOTP(4),
        fare:fare[vehicleType]
    })
    // console.log('ok');
    
    // console.log(ride);
    
    return ride
}
const getOTP=(num)=>{
    const generateOTP=(num)=>{
        const otp=crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString()
        return otp
    }
    return generateOTP(num)
}
const getFare=async(pickup,destination)=>{
    
    if(!pickup || !destination){
        throw new Error('Both pickup and destination are required')
    }
    const distanceTime=await mapService.getDistanceTime(pickup,destination)
    
    const baseFare={
        auto:30,
        car:50,
        moto:20
    }
    const perKmRate={
        auto:10,
        car:15,
        moto:8
    }
    const perMinRate={
        auto:2,
        car:3,
        moto:1.5
    }
    const dist=distanceTime.distance.value/1000
    const t=distanceTime.duration.value/60
    const fare={
        auto:baseFare.auto+(dist*perKmRate.auto)+(t*perMinRate.auto),
        car:baseFare.car+(dist*perKmRate.car)+(t*perMinRate.car),
        moto:baseFare.moto+(dist*perKmRate.moto)+(t*perMinRate.moto)
    }
    // console.log(fare);
    
    return fare
}