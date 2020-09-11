var mongoose = require('mongoose');
const slugify = require('../config/slugify');

var PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  description: {
    type: String,
    
  },
  metaDescription: String,
  excerpt:String,
  featuredImage: String,
  writtenBy: String,
  checkedBy:String,
  checkedDate: Date,
  writtenDate:{type:Date,default:Date.now()},
  slug: String,
  isActive: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
   
  
  },
  isHit: Boolean,
  tags: [Object],
  facebookShareLink: String,
  twitterShareLink: String,
  instaShareLink: String,
  linkedinShareLink: String,
  isFeatured: Boolean,
  status:{
    type:String,
    enum:['unpublished','pending','published'],
    default:"unpublished"
  },
  views:Number
});

PostSchema.pre('save', function (next) {
  this.slug = slugify(this.title);

  next();
});



//creating model
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
