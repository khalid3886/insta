const express=require('express');
const app=express();

const {connection}=require('./db')
const{userRouter}=require('./routes/user.routes')
const {postRouter}=require('./routes/post.routes')
app.use(express.json())

app.use('/users',userRouter)
app.use('/posts',postRouter)
app.get('/',(req,res)=>{
    res.send('home page')
})

app.listen(8080,async()=>{
    try{
await connection
console.log('connected to db')
    }
    catch(err)
    {
        console.log(err)
    }
    console.log('connnect to server at port 8080')
})