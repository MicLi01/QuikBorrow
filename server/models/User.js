const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  bio: {
    type: String,
  },
  age: {
    type: Number,
  },
  wishlist: [{
    type: String,
  }],


});

module.exports = mongoose.model('users', UserSchema);
