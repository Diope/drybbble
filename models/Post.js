const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {type: String, required: true, minlength: 3, maxlength: 60},
  body: {type: String, required: true, minlength: 3, maxlength: 500},
  comments: [
    {
      user: {type: Schema.Types.ObjectId, ref: 'User' },
      body: {type: String, required: true},
      createdAt: {type: Date, default: Date.now()},
      updatedAt: {type: Date, default: Date.now()}
    }
  ],
  slug: {type: String, index: true},
  likes: [{ user: {type: Schema.Types.ObjectId, ref: 'User'}}],
  user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});


PostSchema.pre('save', function(next) {
  var post = this;
  console.log(post);
  if(post.isModified('title')) {
    post.slug = Math.floor(Math.random()*90000) + 10000 + "-" + convertToSlug(post.title)
    next()
  }
  next()
});

PostSchema.pre('sav', function(next) {
  var post = this;
  console.log(post)
  // console.log(post._update.$set.title)
  
})

function convertToSlug(text) {
  // console.log(text.replace(/\s+/g, '-'))
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

const Post = mongoose.model('Post', PostSchema)
module.exports = {Post}