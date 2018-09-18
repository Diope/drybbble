const mongoose = require('mongoose');
const slugHero = require('mongoose-slug-hero');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {type: String, required: true, minlength: 3, maxlength: 60},
  body: {type: String, required: true, minlength: 3, maxlength: 240},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  user: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true});


PostSchema.plugin(slugHero, {doc: 'post', field: 'title', scope:['userId']});
const Post = mongoose.model('Post', PostSchema)
module.exports = {Post}