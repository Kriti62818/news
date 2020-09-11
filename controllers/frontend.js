const Post=require('../model/Post');
const unslugify=require('../config/unslugify')
var getCategories=require('../config/getCategories')

exports.getPosts=async(req,res,next)=>{
    let categories=req.category
    await Post.find().sort({'writtenDate':-1}).exec(function(err,posts){
        if(err){
            console.log(err)
        }
        if(posts){
            console.log(categories)
           
            Post.find().sort({'views':-1}).exec(function(err,popularPosts){
                if(err){
                    console.log(err)
                }
                if(popularPosts){
                    res.render('index',{posts:posts,p:popularPosts,categories:categories})
                }
            })
           
        }
    })
}

exports.getPost=async(req,res,next)=>{
    let categories=req.category
    await Post.findOneAndUpdate({slug:req.params.slug},{$inc:{'views':1}}) .exec(function(err,post){
        if(err){
            console.log(err)
        }
        if(post){
             Post.find({slug:{$nin:req.params.slug}}).sort({'writtenDate':-1}).exec(function(err,posts){
                if(err)
                    console.log(err);
                if(posts){
                    
                            res.render('singlePost',{post:post,relatedPosts:posts,categories:categories})
                }
                    })
                   
           
            
        }
    })
}

exports.getTagPosts=async(req,res,next)=>{
    let categories=req.category
    let tag=unslugify(req.params.tagSlug)
    let page=req.params.page||1
    let perPage=1
    let total=0
    Post.find({tags:{name:tag,slug:req.params.tagSlug}}).limit(perPage).skip((page-1)*perPage).exec(function(err,posts){
        if(err){
            console.log(err)
        }
        if(posts){
            Post.find({tags:{name:tag,slug:req.params.tagSlug}}).exec(function(err,allTagPosts){
                if(err){
                    console.log(err)
                }
                if(allTagPosts){
                
                total=total+allTagPosts.length
                let totalPages=Math.ceil(total/perPage);
                Post.find().sort({'writtenDate':-1}).exec(function(err,latest){
                    if(err){
                        console.log(err)
                    }
                    if(latest){
                        res.render('tagsPost',{posts:posts,tag:tag,latest:latest,tp:totalPages,page:page,categories:categories})
                    }
                })
                }
            })
            
           
           
        }
    })
}

exports.getCategoryPosts=async(req,res,next)=>{
    let categories=req.category
    let page=req.params.page||1
    let perPage=1
    let total=0
    let category=unslugify(req.params.categorySlug)
    await Post.find({category:{'$regex':category,$options:'i'}}).limit(perPage).skip((page-1)*perPage).exec(function(err,posts){
        if(err){
            console.log(err)
        }
        if(posts){
            Post.find({category:{'$regex':category,$options:'i'}}).exec(function(err,allPosts){
                if(err){
                    console.log(err)
                }
                if(allPosts){
                    total+=allPosts.length
                    let totalPages=Math.ceil(total/perPage);
                    Post.find().sort({'writtenDate':-1}).exec(function(err,latest){
                    if(err){
                        console.log(err)
                    }
                    if(latest){
                        res.render('categoryPosts',{posts:posts,category:category,latest:latest,tp:totalPages,page:page,categories:categories})
                    }
                })
                }
            })
           
        }
    })
}

exports.getSearchedPosts=(req,res,next)=>{
    let categories=req.category
    let searchedValue=req.query.s
    Post.find({$or:[{title:{$regex:new RegExp('\\b'+searchedValue+'\\b',"i")}},{description:{$regex:new RegExp('\\b'+searchedValue+'\\b',"i")}}]}).exec(function(err,posts){
      if(err){
        console.log(err)
      }
      if(posts){
        Post.find().sort({'writtenDate':-1}).exec(function(err,latest){
            if(err){
                console.log(err)
            }
            if(latest){
                return res.render("searchList",{posts:posts,searchedValue:searchedValue,latest:latest,categories:categories})
            }
        })
        
      }
      })
}