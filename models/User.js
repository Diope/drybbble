const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 75,
    index: true,
    unique: true,
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

const User = mongoose.model('User', UserSchema)
module.exports = {User}
