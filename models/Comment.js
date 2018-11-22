const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  post: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  user: [{type: Schema.Types.ObjectId, ref: 'User', required: true}],
  body: {type: String, required: true, unique: true, index: true}
}, {timestamps: true})

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = {Comment}