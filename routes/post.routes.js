const express=require('express')
const postRouter=express.Router();
const {postModel}=require('../model/post.model');
const { UserModel } = require('../model/user.model');
const {auth}=require('../middleware/auth.middleware')

postRouter.get('/',auth,async(req,res)=>{
    res.send('post data')
    const userID=req.userID;
    
    try{
        const notes=await postModel.find({userID})
        res.status(200).json(notes)
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})


postRouter.post('/add',async(req,res)=>{
    const {title,body,device,no_of_comments}=req.body;
    const userID=req.userID
    try{
const post=new postModel({title,body,device,no_of_comments,userID})
await post.save()
res.status(200).json({msg:'post has been created'});
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})


postRouter.get('/top',auth,async(req,res)=>{
    const userID=req.userID
    try{
const note=await postModel.find({userID}).sort({comment:-1})
res.status(200).json(note)
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})


postRouter.patch('/update/:id',auth,async(req,res)=>{
    const _id=req.params.id;
    const payload=req.body;
try{
    const userID=req.userID;
    const post=await postModel.findOne({_id})
    if(post.userID===userID)
    {
    await postModel.findByIdAndUpdate(_id,payload)
    res.status(200).json({msg:"post has been updated"})
    }
    else{
        res.status(200).json({msg:'you are not authorised'})
    }
}
catch(err)
{
    res.status(400).json({error:err})
}
})


postRouter.delete('/delete/:id',auth,async(req,res)=>{
    const _id=req.params.id;
try{
    const userID=req.userID;
    const post=await postModel.findOne({_id})
    if(post.userID===userID)
    {
    await postModel.findByIdAndDelete(_id)
    res.status(200).json({msg:"post has been deleted"})
    }
    else{
        res.status(200).json({msg:'you are not authorised'})
    }
}
catch(err)
{
    res.status(400).json({error:err})
}
})


module.exports={
    postRouter
}