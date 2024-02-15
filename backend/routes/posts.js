const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const Post=require('../models/Post')
const Comment=require('../models/Comment')
const verifyToken = require('../verifyToken')
const { createPostController, updatePostController, deletePostController, getDetailsPostController, getPostController, getUserPostController } = require('../controllers/posts')

router.post('/create',verifyToken,createPostController)
router.put('/:id',verifyToken,updatePostController)
router.delete('/:id',verifyToken,deletePostController)
router.get('/:id',getDetailsPostController)
router.get('/',getPostController)
router.get('/user/:userId',getUserPostController)

module.exports = router