const express=require('express')
const User=require('../models/User')
const bcrypt=require('bcrypt')
const Post=require('../models/Post')
const Comment=require('../models/Comment')
// const verifyToken = require('../verifyToken')
const { deleteUserController, updateUserController, getUserController } = require('../controllers/users')
const verifyToken = require('../verifyToken')

const router=express.Router()

router.get('/:id', getUserController)
router.put('/:id',verifyToken, updateUserController)
router.delete('/:id',verifyToken,deleteUserController)

module.exports = router