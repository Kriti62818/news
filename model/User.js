const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add name'],
  },
  email: {
    type: String,
    required: [true, 'Please add email'],
    unique: true,
  },
  role: {
    type: String,
    enum: ['writer', 'editor','admin'],
    default: 'writer',
  },
  password: {
    type: String,
    minlength: 6,
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//encypt password using bcrypt
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});



module.exports = mongoose.model('User', UserSchema);
