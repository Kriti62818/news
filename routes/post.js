var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var {getPosts,deletePost,addPost,editStatus}=require('../controllers/post')
var {protect,authorize}=require('../middleware/auth')

router.get('/form',(req,res,next)=>{
    res.render('form')
})

router.get('/posts',(req,res,next)=>{
    res.render('post')
})

router.get('/getPosts',getPosts)

router.post('/addPost',addPost)


router.get('/editPost/:postId',protect,authorize('admin','editor'),(req,res,next)=>{
    res.render('form')
})

router.post('/editStatus/:id',protect,authorize('admin','editor'),editStatus)

router.post('/deletePost',protect,authorize('admin','editor'),deletePost)

router.get('/getPost/:id',(req,res,next)=>{
    res.render('form')
})


module.exports=router;