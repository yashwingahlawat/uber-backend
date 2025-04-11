const mongoose=require('mongoose')
const rideSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    captain:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Captain'
    },
    pickup:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true,
    },
    fare:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:['pending','accepted','cancelled','completed','ongoing'],
        default:'pending'
    },
    duration:{
        type:Number
    },// sec
    distance:{
        type:Number
    },// meter
    paymentID:{
        type:String
    },
    orderID:{
        type:String
    },
    signature:{
        type:String
    },
    otp:{
        type:String,
        select:false,
        require:true
    }
})

module.exports=mongoose.model('ride',rideSchema)