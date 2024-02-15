const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Post = require('../models/Post')
const Comment = require('../models/Comment')


const getUserController=async(req,res)=>{
try{
    const user = await User.findById(req.params.id)
    const {password,...userData}=user._doc
    res.status(200).json(user)

}catch(err){
    res.status(404).json(err)
}
}

const updateUserController=async(req,res)=>{
    try{
        if(req.body.password){
            const salt=await bcrypt.genSalt(10)
            req.body.password=await bcrypt.hashSync(req.body.password,salt)
        }
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)

    }catch(err){
        res.status(500).json(err)

    }
}


const deleteUserController=async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId:req.params.id})
        await Comment.deleteMany({userId:req.params.id})
        res.status(200).json("User has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
}

module.exports={getUserController,updateUserController,deleteUserController}

