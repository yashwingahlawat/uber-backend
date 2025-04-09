const rideModel=require('../models/ride.model.js')
const mapService=require('../services/maps.service.js')
module.exports.createRide=async () => {
    
}

const getFare=async(pickup,destination)=>{
    if(!pickup || !destination){
        throw new Error('Both pickup and destination are required')
    }
    const distanceTime=await mapService.getDistanceTime(pickup,destination)
    const baseFare={
        auto:30,
        car:50,
        motorcycle:20
    }
    const perKmRate={
        auto:10,
        car:15,
        motorcycle:8
    }
    const perMinRate={
        auto:2,
        car:3,
        motorcycle:1.5
    }
    const fare={
        auto:baseFare.auto+(distanceTime.distance*perKmRate.auto)+(distanceTime.time*perMinRate.auto),
        car:baseFare.car+(distanceTime.distance*perKmRate.car)+(distanceTime.time*perMinRate.car),
        motorcycle:baseFare.motorcycle+(distanceTime.distance*perKmRate.motorcycle)+(distanceTime.time*perMinRate.motorcycle)
    }
    return fare
}