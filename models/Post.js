const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: {type: String, required: true, minlength: 3, maxlength: 60},
  body: {type: String, required: true, minlength: 3, maxlength: 240}
}, {timestamps: true});

const Post = mongoose.model('Post', PostSchema)
module.exports = {Post}