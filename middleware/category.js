const Category=require('../model/Category')

exports.getCategories=async(req,res,next)=>{
    try{
        
        req.category=await Category.find();
        next()
    }
    catch(err){
       // res.status(400).send('Invalid token')
       return res.redirect('/backend/login')
    }
}