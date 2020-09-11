const Roles=require('../model/Role');

exports.addRole=async(req,res,next)=>{
    console.log(req.body)
   if(req.body.role.id!='' && req.body.role.id!=null){
      const role=await Roles.findByIdAndUpdate(req.body.role.id,{name:req.body.role.name},{
        new: true,
        runValidators: true,
        upsert:true,
        setDefaultsOnInsert:true
      })
      console.log('Role edited')
     
   }
   else{
    const role=new Roles({
        name:req.body.role.name
    })
    role.save(function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            console.log("Role added")
        }
    });
}
res.end()
}

exports.getRoles=(req,res,next)=>{
    Roles.find().exec(function(err,roles){
        if(err){
            console.log(err)
        }
        if(roles){
            res.status(200).json({
                roles
            })
        }
    })
}

exports.deleteRole=async(req,res,next)=>{
    console.log(req.body)
    await Roles.findByIdAndDelete(req.body.roleId).exec(function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            console.log("Role deleted")
        }
    })
}