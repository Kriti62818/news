var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var Roles=require('../model/Role')
var {getRoles,addRole,deleteRole}=require('../controllers/role')
var {protect,authorize}=require('../middleware/auth')

router.get('/roles',protect,authorize('admin'),(req,res,next)=>{
    res.render('role')
})

router.post('/addRole',protect,authorize('admin'),addRole)

router.get('/getRoles',protect,authorize('admin'),getRoles)

router.post('/deleteRole',protect,authorize('admin'),deleteRole)

module.exports=router;