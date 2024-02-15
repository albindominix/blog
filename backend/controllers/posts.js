const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const Post=require('../models/Post')
const Comment=require('../models/Comment')
const verifyToken = require('../verifyToken')



//CREATE
const createPostController= async (req,res)=>{
    try{
        const newPost=new Post(req.body)
       

        const savedPost=await newPost.save()
        
        res.status(200).json(savedPost)
    }
    catch(err){
        
        res.status(500).json(err)
    }
     
}

//UPDATE
const updatePostController = async (req,res)=>{
    try{
        console.log("🚀 ~ file: posts.js:32 ~ updatePostController ~ req.params.id:", req.params.id)
        const updatedPost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedPost)

    }
    catch(err){
        res.status(500).json(err)
    }
}


//DELETE
const deletePostController=async (req,res)=>{
    try{
        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({postId:req.params.id})
        res.status(200).json("Post has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
}


//GET POST DETAILS
const getDetailsPostController = async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
}

//GET POSTS
const getPostController = async (req,res)=>{
    const query=req.query
    
    try{
        
        const posts = await Post.find()
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
}

//GET USER POSTS
const getUserPostController = async (req,res)=>{
    try{
        console.log(req.params)
        const posts=await Post.find({userId:req.params.userId})
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
}



module.exports={
createPostController,
updatePostController,
deletePostController,
getDetailsPostController,
getPostController,
getUserPostController,
}