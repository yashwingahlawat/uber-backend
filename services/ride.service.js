const rideModel=require('../models/ride.model.js')
const mapService=require('../services/maps.service.js')
module.exports.createRide=async ({user,pickup,destination,vehicleType}) => {
    if(!user || !pickup || !destination || !vehicleType)
        throw new Error('All fields are required.')
    const fare=await getFare(pickup,destination)
    const ride=rideModel.create({
        user,
        pickup,
        destination,
        fare:fare[vehicleType]
    })
    return ride
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
    const fare={
        auto:baseFare.auto+(distanceTime.distance*perKmRate.auto)+(distanceTime.time*perMinRate.auto),
        car:baseFare.car+(distanceTime.distance*perKmRate.car)+(distanceTime.time*perMinRate.car),
        moto:baseFare.moto+(distanceTime.distance*perKmRate.moto)+(distanceTime.time*perMinRate.moto)
    }
    return fare
}