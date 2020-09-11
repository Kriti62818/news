var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken')

var RoleSchema=new mongoose.Schema({
    name:String,
    createdAt:{type:Date,default:Date.now()},
    createdBy:String
})

const Roles=mongoose.model('Roles',RoleSchema);
module.exports=Roles;
