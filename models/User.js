const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 13;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [25, "Username must be no longer than 25 characters"],
    index: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    validate: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email is not valid, please enter a valid email"
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

// PRE & POST:

UserSchema.pre('save', function(next) {
  var user = this;
  if(user.isModified('password')) {
    bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
      if (err) return next(err)
      bcrypt.hash(user.password, salt, function(err, hash){
        if (err) throw new Error(err)
        user.password = hash;
        next();
      })
    })
  } else {
    next()
  }
});

UserSchema.post('save', function(err, doc, next) {
  var user = this;
  if (err.name === 'MongoError' && err.code === 11000) {
    next(new Error(`The email ${user.email} is already in use, please use another email`));
  } else {
    next(err);
  }
});

UserSchema.post('save', function(err, doc, next) {
  var user = this;
  if (user.username) {
    next(new Error(`The username ${user.username} is already in use, please choose another username`))
  } else {
    next(err)
  }
})

// METHODS:
UserSchema.methods.comparePassword = function comparePassword(candidatePass, cb) {
  bcrypt.compare(candidatePass, this.password, function(err, isMatch){
    if (err) return cb(err);
    cb(null, isMatch);
  })
}

const User = mongoose.model('User', UserSchema)
module.exports = {User}
