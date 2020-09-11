var mongoose = require('mongoose');
const slugify = require('../config/slugify');

var CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  slug: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt:{
      type:Date,
      default:Date.now()
  }
  
  
});

CategorySchema.pre('save', function (next) {
  this.slug = slugify(this.name);

  next();
});


//creating model
const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
