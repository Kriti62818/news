const Post=require('../model/Post');
const slugify=require('../config/slugify')

exports.getPosts=(req,res,next)=>{
    Post.find().exec(function(err,posts){
        if(err){
            console.log(err)
        }
        if(posts){
            res.status(200).json({
                posts   
            })
        }
    })
}

exports.addPost=async(req,res,next)=>{
    let tags=[]
    req.body.post.tags.forEach(function(tag){
        tags.push({name:tag,slug:slugify(tag)})
    })
    console.log(req.body)
    if(req.body.post.id!=null && req.body.post.id!=''){
        await Post.findByIdAndUpdate(req.body.post.id,{
            title:req.body.post.title,
            description:req.body.post.description,
            metaDescription:req.body.post.metaDescription,
            excerpt:req.body.post.excerpt,
            tags:tags,
            category:req.body.post.category,
            status:'pending',
            slug:slugify(req.body.post.title),
            views:0,
            checkedBy:req.body.user,
            checkedDate:Date.now()
        },{
            new: true,
            runValidators: true,
            upsert:true,
            setDefaultsOnInsert:true
        })
        console.log('Post updated')
        }
    else{
    
    //console.log(req.body.post.title)
    const p=new Post({
        title:req.body.post.title,
        description:req.body.post.description,
        metaDescription:req.body.post.metaDescription,
        excerpt:req.body.post.excerpt,
        tags:tags,
        category:req.body.post.category,
        writtenBy:req.body.user
    })
    p.save().exec(function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            console.log("post saved")
        }
    })
    }
}

exports.editPost=(req,res,next)=>{
    console.log(req.params.postId)
}

exports.deletePost=(req,res,next)=>{
    console.log(req.body)
    Post.findByIdAndDelete(req.body.postId).exec(function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            console.log('Post deleted')
        }
    })
}

exports.editStatus=async(req,res,next)=>{
    console.log(req.params.id)
    await Post.findByIdAndUpdate(req.params.id,{
        status:'published'
    },
    {new: true,
        runValidators: true,
        upsert:true,
        setDefaultsOnInsert:true
    });
}