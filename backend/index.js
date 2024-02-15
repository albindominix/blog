const express=require('express')
const { default: mongoose } = require('mongoose')
const app=express()
// const mongoose=require('mongoose')
    const bodyParser = require('body-parser')
const dotenv=require('dotenv')
const cors=require('cors')
// const multer=require('multer')
// const path=require("path")
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/auth')
const userRoute=require('./routes/users')
const postRoute=require('./routes/posts')
const commentRoute=require('./routes/comments')
// const commentRoute=require('./routes/comments')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())
dotenv.config()

const connectDB  =async()=>{
    try{
await mongoose.connect(process.env.MONGO_URL)
console.log('database is connected successfully')
    }catch(err){
        console.log(err, 'connectDB error')
    }
}

app.use('/auth',authRoute)
app.use('/users',userRoute)
app.use('/posts',postRoute)
app.use('/comments',commentRoute)
app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("app is running at ",process.env.PORT)
})