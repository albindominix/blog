const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { registerController, loginController, logoutController, refetchController } = require('../controllers/auth.js')

router.post('/register',registerController)
router.post('/login',loginController)
router.post('/logout',logoutController)
router.get('/users/refetch',refetchController)

module.exports =router