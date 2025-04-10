const express=require('express')
const router=express.Router()
const rideController=require('../controllers/ride.controller')
const middlewares=require('../middlewares/auth.middleware')
const {body}=require('express-validator')

router.post('/create',
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination'),
    body('vehicleType').isString().isIn(['moto','auto','car']).withMessage('Invalid vehicle type'),
    middlewares.authUser,
    rideController.createRide
)
module.exports=router