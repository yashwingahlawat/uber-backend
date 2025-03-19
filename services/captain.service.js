const captainModel=require("../models/captain.model.js")


module.exports.createCaptain=async({fullname,email,password,vehicle})=>{
    if(!fullname || !email || !password || !vehicle){
        throw new Error("All fields are required.")
    }
    const captain=await captainModel.create({
        fullname:{
            firstname:fullname.firstname,
            lastname:fullname.lastname
        },
        email,
        password,
        vehicle:{
            color:vehicle.color,
            plate:vehicle.plate,
            capacity:vehicle.capacity,
            vehicleType:vehicle.vehicleType
        }
    })
    return captain

}