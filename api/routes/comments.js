const express = require('express');
const router = express.Router();

const {Post} = require('../../models/Post');
const {User} = require('../../models/User');
const auth = require('../middleware/auth');

router.post('/comment/:id', auth, async (req, res, next) => {
  let id = req.params.id;
  // let opt = {path: 'user', select: [ 'id', 'username']}

  let _user = await User.findById(req.user.id)
  let post = await Post.findOne({_id: id})
  const comment = {body: req.body.body, user: req.user.id}

  try {
    if (post === null || !post) {
      return next({status: 400, message: "Zoinks, seems that post doesn't exist!"})
    } else if (_user === null || !_user) {
      return next({status:401, message: "Uh oh, it seems you're not authorized to do that Starfox, perhaps you need to log in?"})
    }
    console.log(post)
  } catch (err) {
    next(err)
  }

  // User.findById(req.user.id).then((user) => {
  //   Post.findOne({_id: id}).then((post) => {
  //     console.log(post[0])
  //     const comment = {
  //       body: req.body.body,
  //       user: req.user.id
  //     }
  //     post.comments.unshift(comment)
  //     post.save().then((result) => res.json(result))
  //   }).catch((err) => console.log(err))
  // }).catch((err) => res.status(200).json({message: "Error 2"}))
})