const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
name:String,
email:String,
age:Number,
gender:String,
password:String,
city:String
},{
    versionKey:false
})

const UserModel=mongoose.model('user',UserSchema)
module.exports={
    UserModel
}