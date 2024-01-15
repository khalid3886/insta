const express=require('express');
const userRouter=express.Router();
const {UserModel}=require('../model/user.model')
const {BlacklistModel}=require('../model/blacklist.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
userRouter.get('/',(req,res)=>{
    res.send('this is user data')
})


userRouter.post('/register',async(req,res)=>{
    const {name,email,age,gender,password,city}=req.body;
    try{
        const exist=await UserModel.findOne({email})
        if(exist)
        {
            res.status(200).json({msg:'User already exist, please login'})
        }
const hash=await bcrypt.hash(password,5)
const user=new UserModel({name,email,age,gender,password:hash,city})
await user.save();
res.status(200).json({msg:'user has been registered'})
    }
    catch(err)
    {
        console.log(err)
        res.status(400).json({error:err})
    }
})

userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
const user=await UserModel.findOne({email})
const result=bcrypt.compare(password,user.password)
if(result)
{
const access_token=jwt.sign({userID:user._id},'khalid',{expiresIn:'7d'})
res.status(200).json({msg:'login successfull',access_token})
}
else{
    res.status(200).json({msg:'wrong credentials,enter again'})
}
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})


userRouter.get('/logout',async(req,res)=>{
const token=req.headers.authorization?.split(" ")[1]
try{
await BlacklistModel.create(token)
res.status(200).json({msg:'logout successfull'})
}
catch(err)
{
    res.status(400).json({error:err})
}
})

module.exports={
    userRouter
}