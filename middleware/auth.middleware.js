const {UserModel}=require('../model/user.model')
const {BlacklistModel}=require('../model/blacklist.model')
const jwt=require('jsonwebtoken')

const auth=async (req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    try{
const tokenblacklist=await BlacklistModel.findOne({token})
if(tokenblacklist)
{
    res.status(200).json({msg:'you have been logout,log in again'})
}
const decoded=jwt.verify(token,'khalid')
if(decoded)
{
    req.userID=decoded.userID
next()
}
else{
    res.status(200).json({msg:"you are not authorised"})
}
    }
    catch(err)
    {

    }
}


module.exports={
    auth
}