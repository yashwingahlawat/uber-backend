const express=require('express')
const router=express.Router()
const {body}=require('express-validator')

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email.'),
    body('fullname.firstname').isLength({min:3}).withMessage('First Name must be atleast 3 characters long.'),
    body('fullname.lastname').isLength({min:3}).withMessage('Last Name must be atleast 3 characters long.'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long.'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be atleast 3 characters long.'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate must be atleast 3 characters long.'),
    body('vecicle.capacity').isInt({min:3}).withMessage('Capacity must be atleast 3.'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid Vehicle Type.')
]
)

module.exports=router;