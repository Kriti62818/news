const jwt=require('jsonwebtoken');
const User=require('../model/User');

exports.protect=async(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.redirect('/backend/login')
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(decoded._id);
        next()
    }
    catch(err){
       // res.status(400).send('Invalid token')
       return res.redirect('/backend/login')
    }
}

exports.authorize=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.redirect('/backend/login');
        }
        next();
    }
}