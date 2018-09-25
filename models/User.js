const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const privateKey = fs.readFileSync(path.join(__dirname, '../config') + '/private.key', 'utf8')

const Schema = mongoose.Schema;

const SALT_ROUNDS = 13;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [25, "Username must be no longer than 25 characters"],
    index: [true, "Username is already in use, please try another"],
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
  if (user.username.length >= 2) {
    next(new Error(`The username ${user.username} is too short, the minimum acceptable character length is 3`))
  } else if (user.username) {
    next(new Error(`The username ${user.username} is already in use, please try another username.`))
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

UserSchema.methods.generateJWT = function(cb) {
  var user = this

  var payload = {
    id: user._id,
    username: user.username,
    email: user.email
  }

  var signOptions = {
    issuer: 'dipet.me',
    expiresIn: '15d',
    algorithm: "RS256"
  }
  
  var token = jwt.sign(payload, privateKey, signOptions)
  cb(null, token)
}

// VIRTUAL:

UserSchema.virtual('postCount').get(function() {
  return this.posts.length
});


const User = mongoose.model('User', UserSchema)
module.exports = {User}
