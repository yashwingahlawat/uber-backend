const userModel=require("../models/user.model.js") 

module.exports.createUser=async({fullname,email,password})=>{
    const firstname=fullname.firstname
    const lastname=fullname.lastname
    if(!firstname || !email || !password){
        throw new Error("All fields are required")
    }
    const user=userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}