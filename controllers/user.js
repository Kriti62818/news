const User=require('../model/User');
const bcrypt=require('bcryptjs')

exports.getUsers=(req,res,next)=>{
    User.find().exec(function(err,users){
        if(err){
            console.log(err)
        }
        if(users){
            res.status(200).json({
                users
            })
        }
    })
}

exports.addUser=async (req,res,next)=>{
    const salt = await bcrypt.genSalt(10);
    console.log(req.body)
    if(req.body.user.id!=null && req.body.user.id!=''){
        const user=await User.findByIdAndUpdate(req.body.user.id,{
            name:req.body.user.name,
            password:await bcrypt.hash(req.body.user.password,salt),
            role:req.body.user.role
        },{
            new: true,
            runValidators: true,
            upsert:true,
            setDefaultsOnInsert:true
        })
        console.log("User edited")
    }
    else{
        const user=new User({
            name:req.body.user.name,
            role:req.body.user.role,
            password:req.body.user.password,
            email:req.body.user.email,
        })
        user.save(function(err,result){
            if(err){
                console.log(err)
            }
            if(result){
                console.log('User added')
            }
            })
           
    }
}

exports.deleteUser=(req,res,next)=>{
    console.log(req.body)
    User.findByIdAndDelete(req.body.userId).exec(function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            console.log('User deleted')
        }
    })
}