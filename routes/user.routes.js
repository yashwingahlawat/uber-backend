const express=require("express");
const router=express.Router()
const userController=require("../controllers/user.controller.js")
const {body}=require("express-validator")
const authMiddleware=require("../middlewares/auth.middleware.js")
router.post('/register',[body('email').isEmail().withMessage('Email is Invalid'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be of atleast 3 characters.'),
    body('password').isLength({min:6}).withMessage('Password must be of atleast 6 characters.')
],
userController.registerUser
)
router.post('/login',[
    body('email').isEmail().withMessage('Email is Invalid'),
    body('password').isLength({min:6}).withMessage('Password must be of atleast 6 characters.')
],
userController.loginUser
)
router.get('/profile',
    authMiddleware.authUser,
    userController.getUserProfile
)

router.get('/logout',userController.logoutUser)

module.exports=router;