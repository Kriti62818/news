var express = require('express');
var router = express.Router();
var {getPosts,getPost,getTagPosts,getCategoryPosts,getSearchedPosts}=require('../controllers/frontend');
var {getCategories}=require('../middleware/category')
/* GET home page. */
router.get('/',getCategories,getPosts);

router.get('/test2',(req,res,next)=>{
    res.render('test2')
})

router.get('/search',getCategories,getSearchedPosts)

router.get('/category/:categorySlug/:page?',getCategories,getCategoryPosts)

router.get('/:slug',getCategories,getPost)



router.get('/tag/:tagSlug/:page?',getCategories,getTagPosts)



module.exports = router;
