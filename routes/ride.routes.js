const express=require('express')
const router=express.Router()
const {body}=require('express-validator')

router.post('/create',async(req,res)=>{
    body('userId').isString().isLength({min:24,max:24}).withMessage('Invalid userId'),
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination'),

})