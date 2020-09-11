const User=require('../model/User')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')

exports.handleLogin=async(req,res,next)=>{
    const {userName,password}=req.body.user;

    if(!userName || !password){
        return res.json({msg:'Required',status:400})
    }

    const user=await User.findOne({name:userName});
    if(!user){
        return res.json({msg:"Username is not valid",status:400})
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.json({msg:"Password doesnot match",status:400})
    }

     //create token and assign
     const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
      });
    
      const options = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
       
      };
     
     res.cookie('token',token,options)
      return res.json({
        msg:'login successful',
        user:user.name,
        role:user.role
      })

}

exports.logout=(req,res,next)=>{
  res.clearCookie('token');
  return res.redirect('/backend/login')
}