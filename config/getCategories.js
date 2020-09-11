const Category=require('../model/Category')

const getCategories=async function(){
    await Category.find().exec(function(err,categories){
        if(err){
            return err
        }
        if(categories){
            return categories
        }
    })
   


}

module.exports=getCategories