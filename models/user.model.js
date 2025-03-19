const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const mongoose = require("mongoose");

const userSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First Name must be atleast of 3 characters']
        },
        lastname:{
            type:String,
            minlength:[3,'Last Name must be atleast of 3 characters']
        }
    },
    email:{
        type:String,
        required:true,
        minlength:[5,'Email must be atleast of 3 characters']
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String
    }

})
userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.statics.hashPassword=async function(password){
    return bcrypt.hash(password,10)
}
const userModel=mongoose.model('user',userSchema);
module.exports=userModel