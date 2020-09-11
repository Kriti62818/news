var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var Roles=require('../model/Role')
var {getCategories,addCategory,deleteCategory}=require('../controllers/category')
var {protect,authorize}=require('../middleware/auth')

router.get('/category',protect,authorize('admin'),(req,res,next)=>{
    res.render('category')
})


router.post('/addCategory',protect,authorize('admin'),addCategory)

router.get('/getCategory',getCategories)

router.post('/deleteCategory',protect,authorize('admin'),deleteCategory)

module.exports=router;