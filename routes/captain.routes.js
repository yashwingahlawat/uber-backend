const express=require('express')
const captainController=require('../controllers/captain.controller.js')
const authMiddleware=require('../middlewares/auth.middleware.js')
const router=express.Router()
const {body}=require('express-validator')

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email.'),
    body('fullname.firstname').isLength({min:3}).withMessage('First Name must be atleast 3 characters long.'),
    body('fullname.lastname').isLength({min:3}).withMessage('Last Name must be atleast 3 characters long.'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long.'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be atleast 3 characters long.'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate must be atleast 3 characters long.'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity must be atleast 1.'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid Vehicle Type.')
],
captainController.registerCaptain
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email.'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long.')
],
captainController.loginCaptain
)

router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile)

router.get('/logout',captainController.logoutCaptain)

module.exports=router;