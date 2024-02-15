const express=require('express')
const router=express.Router()

const verifyToken = require('../verifyToken')
const { createCommentController, updateCommentController, deleteCommentController, getDetailsCommentController, getCommentController, getUserCommentController } = require('../controllers/comment')

router.post('/create',verifyToken,createCommentController)
router.put('/:id',verifyToken,updateCommentController)
router.delete('/:id',verifyToken,deleteCommentController)
router.get('/post/:postId',getUserCommentController)
module.exports = router