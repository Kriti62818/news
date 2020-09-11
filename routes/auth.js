var express=require('express')
var router=express.Router();
var {handleLogin,logout}=require('../controllers/auth.js')

router.get('/login',(req,res,next)=>{
    res.render('login')
})

router.post('/handleLogin',handleLogin)

router.get('/logout',logout)

module.exports=router;