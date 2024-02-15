const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const registerController = async(req,res)=>{
try{
    const {email,username,password} =req.body;
    const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hashSync(password,salt)
    const newUser  = new User({username,email,password:hashedPassword})

    const savedUser = await newUser.save()
    res.status(200).json(savedUser)
}catch(err){
    
}
}
const loginController = async(req,res)=>{
   try{
    const {email,username} =req.body; 

    const user=await User.findOne({email})
       
    if(!user){
        return res.status(404).json("User not found!")
    }
    const match=await bcrypt.compare(req.body.password,user.password)
    if(!match){
        return res.status(401).json("Wrong credentials!")
    }

    const token=jwt.sign({_id:user._id,username:user.username,email:user.email},process.env.SECRET,{expiresIn:"3d"})
const {password,...userData} = user._doc

    res.cookie('token',token).status(200).json(userData)
   }catch(err){
    
   }
    
}

const logoutController= async(req,res)=>{
try{
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User logged out successfully!")

    }
    catch(err){
        res.status(500).json(err)
    }
}

const refetchController = async(req,res)=>{
    
    const token=req.cookies.token
    jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
}

module.exports={
    registerController ,loginController,logoutController,refetchController
}