const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const Comment=require('../models/Comment')
const verifyToken = require('../verifyToken')



//CREATE
const createCommentController= async (req,res)=>{
    try{
        const newComment=new Comment(req.body)
        const savedComment=await newComment.save()
        
        res.status(200).json(savedComment)
    }
    catch(err){
        
        res.status(500).json(err)
    }
     
}

//UPDATE
const updateCommentController = async (req,res)=>{
    try{
       
        const updatedComment=await Comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedComment)

    }
    catch(err){
        res.status(500).json(err)
    }
}


//DELETE
const deleteCommentController=async (req,res)=>{
    try{
        await Comment.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({CommentId:req.params.id}) ///ith doubt und
        res.status(200).json("Comment has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
}



//GET Posts CommentS
const getUserCommentController = async (req,res)=>{
    try{
        const comments=await Comment.find({postId:req.params.postId})
        res.status(200).json(comments)
    }
    catch(err){
        res.status(500).json(err)
    }
}



module.exports={
createCommentController,
updateCommentController,
deleteCommentController,
getUserCommentController,
}