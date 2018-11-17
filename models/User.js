const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const privateKey = fs.readFileSync(path.join(__dirname, '../config') + '/private.key', 'utf8')
const SALT_ROUNDS = 13;

const Schema = mongoose.Schema;


const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [25, "Username must be no longer than 25 characters"],
    index: [true, "Username is already in use, please try another"],
    unique: true,
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
    minlength: 6
  },
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  profile: {
    website: {type: String, validate: [
      /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,  "URL not valid, please enter a valid URL"
      ],
      lowercase: true,
      trim: true
    },
    forHire: {type: Boolean, default: false},
    location: {type: String, maxlength: 40 },
    bio: {type: String, maxlength: 500}
  },
  avatar: [
    {
      url: {type: String, default: '/static/img/defaultAvatar.png'},
      public_id: {type: String}
    }
  ],
  background: {
    url:{type: String, default: "/static/img/defaultBG.png"},
    public_id: {type: String}
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
  if (user.isModified('username')) {
    if (user.username.length <= 2) {
      next(new Error("The username must be at least 3 characters in length"))
    } else {
      next()
    }
  }
})

UserSchema.post('save', function(err, doc, next) {
  var user = this;
  var email = new RegExp(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/);
  if (user.isModified('email')) {
    if (email.test(user.email) === false) {
      next(new Error(`The email ${user.email} is not a valid email, please enter a valid email`))
    } else {
      next()
    }
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

UserSchema.methods.deleteToken = function(cb) {
  var user = this;
  
}

// VIRTUAL:

UserSchema.virtual('postCount').get(function() {
  return this.posts.length
});




const User = mongoose.model('User', UserSchema)
module.exports = {User}
