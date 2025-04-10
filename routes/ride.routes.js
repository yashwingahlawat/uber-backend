const express=require('express')
const router=express.Router()
const rideController=require('../controllers/ride.controller')
const middlewares=require('../middlewares/auth.middleware')
const {body}=require('express-validator')

router.post('/create',async(req,res)=>{
    body('userId').isString().isLength({min:24,max:24}).withMessage('Invalid userId'),
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination'),
    body('vehicleType').isString().isIn(['moto','auto','car']).withMessage('Invalid vehicle type'),
    middlewares.authUser,
    rideController.createRide
})