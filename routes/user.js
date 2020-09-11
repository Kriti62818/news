var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var Users=require('../model/User')
var {getUsers,addUser,deleteUser}=require('../controllers/user')
var {protect,authorize}=require('../middleware/auth')

router.get('/users',protect,authorize('admin'),(req,res,next)=>{
    res.render('user')
})

router.get('/getUsers',protect,authorize('admin'),getUsers)

router.post('/addUser',protect,authorize('admin'),addUser)

router.post('/deleteUser',protect,authorize('admin'),deleteUser)

module.exports=router;