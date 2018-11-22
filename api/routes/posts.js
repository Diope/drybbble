const express = require('express');
const router = express.Router();

const {Post} = require('../../models/Post');
const {Comment} = require('../../models/Comment');
const {User} = require('../../models/User');
const auth = require('../middleware/auth');

const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const cloudConfig = require('../../config/cloudinary');

cloudinary.config({
  cloud_name: cloudConfig.cloud_name,
  api_key: cloudConfig.api_key,
  api_secret: cloudConfig.api_secret
})

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'drybbble_uploads',
  allowed_formats: ['jpeg', 'png', 'gif'],
  transformation: [{ width: 900, crop: "scale" }]
})

const parser = multer({storage: storage})
// URL -> localhost:3851/api

// GET:
  // All Shots
router.get('/', async (req, res, next) => {
  let post = await Post.find({}).limit(20)

  try {
    if (post === null || !post) {
      return next({status: 400, message: "Will redirect to hero or gen error"})
    }
    return res.status(200).json(post)
  } catch (err) {
    next(err)
  }

  // Post.find({}).limit(20).exec((err, results) => {
  //   if (err) return res.status(400).json({message: "There is an error", err})
  //   res.status(200).send(results)
  // })
});

  // Individual
router.get('/:slug', (req, res) => {
  const slug = req.params.slug;
  Post.find({slug: slug}, (err, post) => {
    if (post.length === 0) {
      return res.status(400).json({message: "Shot does not exist, perhaps it has been deleted?"})
    }
    res.status(200).json(post)
  })
})

// POST:

  // New
router.post('/new', auth, parser.single('userShot'), (req, res) => {

  console.log(req.body)
  User.findById(req.user.id).then((user) => {
    const newPost = {
      title: req.body.title,
      body: req.body.body,
      user: req.user.id,
      userShot: {url: req.file.url, public_id: req.file.public_id}
    }
    Post.create(newPost).then((post) => {
      user.posts.push(post)
      user.save()
      .then((result) => res.status(200).json({message: "Shot successful!"}))
      .catch((err) => res.status(400).json(err))
    })
    .catch((err) => res.status(200).json(err))
  })
  .catch((err) => res.status(200).json(err))
})

router.post('/comments/:id', auth, async (req, res, next) => {
  let id = req.params.id;
  let opt = {path: 'user', select: ['id', 'username']}

  let _user = await User.findById(req.user.id)
  let post = await Post.findOne({_id: id}).populate(opt)
  const comment = {body: req.body.body, user: req.user.id }


  try {
    if (post === null || !post) {
      return next({status: 400, message: "Zoinks, seems that post doesn't exist!"})
    } else if (_user === null || !_user) {
      return next({status:401, message: "Uh oh, it seems you're not authorized to do that Starfox, perhaps you need to log in?"})
    }
    post.comments.unshift(comment)
    console.log(post.comments[1])
    // post.save()
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

router.get('/comments/:id', async (req, res, next) => {
  let id = req.params.id

  let comment = await Comment.findById({_id: id})

  console.log(comment)
})

// UPDATE: // find returns an array, findBy* returns an object. You cannot do PUT/PATCH requests with multer
// router.put('/:id', auth, parser.single('userShot'), (req, res) => {
//   let id = req.params.id
//   console.log(req.file)
//   User.findById(req.user.id, (err, user) => {
//     Post.findById({_id: id}).then((post) => {
//       if (post.user.toString() !== req.user.id) {
//         return res.status(200).json({message: "You are not authorized to edit this shot"})
//       }
//       post.title = req.body.title
//       post.body = req.body.body
//       // post.userShot[0].url = req.file.url
//       // post.userShot[0].public_id = req.file.public_id
      
//       // const userShot = {
//       //   userShot: {url: req.file.url, public_id: req.file.public_id}
//       // }

//       // console.log(userShot)
//       // console.log(post.userShot)
//       // console.log(req.body)
//       // post.save()
//       //   .then((result) => console.log("yatta"))
//       //   .catch(err => console.log(err.message))
//     }).catch(err => console.log(err))
//   })
// });

// DELETE:

router.delete('/:slug', auth, async (req, res, next) => {
  let slug = req.params.slug
  let _user = await User.findById(req.user.id)
  let _post = await Post.findOne({slug: slug})
  try {
    if (! _post) {
      return next({status: 401, message: "That shot could not be found, perhaps it has been deleted? 🤔"})
    } else if (_user._id.toString() === _post.user.toString()) {
      _post.remove()
      return res.status(200).json({message: "Your shot has successfully been deleted"})
    } else if (_user._id.toString() != _post.user.toString()) {
      return next({status: 400, message: "You are not authorized to perform that action"})
    }
  } catch (err) {
    next(err)
  }

  // User.findById(req.user.id, (err, user) => {
  //   Post.findOne({slug: slug}).then((post) => {
  //     // console.log(post.user.toString() === req.user.id)
  //     if (post.user.toString() !== req.user.id) {
  //       res.status(400).json({message: "You are not authorized to edit this shot!"})
  //     } else {
  //       post.remove()
  //       return res.status(200).json({message: "Your shot has been deleted!"})
  //     }
  //   }).catch((err) => res.status(400).json("Could not find post, perhaps it's been deleted?"))
  // })
})

module.exports = router;