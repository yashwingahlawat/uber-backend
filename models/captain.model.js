const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const captainSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minLength:[3,'Atleast 3 characters']
        },
        lastname:{
            type:String,
            minLength:[3,'Atleast 3 characters']
        }
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'Email must be atleast of 3 characters']
    },
    password:{
        type:String,
        required:true,
        select:false,
        minLength:[6,'Atleast 6 characters']
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minLength:[3,'Atleast 3 characters']
        },
        plate:{
            type:String,
            required:true,
            minLength:[3,'Atleast 3 characters']
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'Atleast 1']
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','moto','auto']
        },
    },
    location:{
        lat:{
            type:Number
        },
        lng:{
            type:Number
        }
    }
})
captainSchema.methods.generateToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token
}
captainSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}
captainSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10)
}

const captainModel=mongoose.model('Captain',captainSchema)
module.exports=captainModel