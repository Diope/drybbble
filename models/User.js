const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 13;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 75,
    index: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ],
    lowercase: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  }
}, {timestamps: true});

UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash){
    if (err) throw new Error(err)
    user.password = hash;
    next();
  })
})

const User = mongoose.model('User', UserSchema)
module.exports = {User}
