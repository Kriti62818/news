const Category=require('../model/Category');

exports.addCategory=async(req,res,next)=>{
    console.log(req.body)
   if(req.body.category.id!='' && req.body.category.id!=null){
      const category=await Category.findByIdAndUpdate(req.body.category.id,{name:req.body.category.name},{
        new: true,
        runValidators: true,
        upsert:true,
        setDefaultsOnInsert:true
      })
      console.log('Category edited')
     
   }
   else{
    const category=new Category({
        name:req.body.category.name
    })
    category.save(function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            console.log("Category added")
        }
    });
}
}

exports.getCategories=(req,res,next)=>{
    Category.find().exec(function(err,categories){
        if(err){
            console.log(err)
        }
        if(categories){
            res.status(200).json({
                categories
            })
        }
    })
}

exports.deleteCategory=async(req,res,next)=>{
    console.log(req.body)
    await Category.findByIdAndDelete(req.body.categoryId).exec(function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            console.log("Category deleted")
        }
    })
}