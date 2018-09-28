const express = require('express');
const router = express.Router();

const {Post} = require('../../models/Post');
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
router.get('/', (req, res) => {
  Post.find({}).limit(20).exec((err, results) => {
    if (err) return res.status(400).json({message: "There is an error", err})
    res.status(200).send(results)
  })
});

  // Individal
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
  console.log(req.file)
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

router.post('/comment/:id', auth, (req, res) => {
  let id = req.params.id;
  User.findById(req.user.id).then((user) => {
    Post.find({_id: id}).then((post) => {
      console.log(post[0])
      const comment = {
        body: req.body.body,
        user: req.user.id
      }
      post[0].comments.unshift(comment)
      post[0].save().then((result) => res.json(result))
    }).catch((err) => console.log(err))
  }).catch((err) => res.status(200).json({message: "Error 2"}))
})

// UPDATE:
router.put('/:slug', auth, (req, res) => {
  let slug = req.params.slug
  User.findById(req.user.id, (err, user) => {
    Post.find({slug: slug}).then((post) => {
      console.log(post[0].id)
      if (post[0].user.toString() !== req.user.id) {
        return res.status(200).json({message: "You are not authorized to edit this shot"})
      }
      post[0].title = req.body.title
      post[0].body = req.body.body
      // console.log(req.body)
      post[0].save()
      .then((result) => console.log(result))
      .catch(err => console.log(err))
    }).catch(err => res.status(400).json({message: "Shot does not exist"}))
  })
});

// DELETE:

router.delete('/:slug', auth, (req, res) => {
  let slug = req.params.slug
  User.findById(req.user.id, (err, user) => {
    Post.findOneAndDelete({slug: slug}).then((post) => {
      console.log(post)
      if (post.user.toString() !== req.user.id) {
        res.status(400).json({message: "You are not authorized to edit this shot!"})
      }
       res.status(200).json({message: "Your shot has been deleted!"})
    }).catch((err) => res.status(400).json("Could not find post, perhaps it's been deleted?"))
  })

  // Post.findByIdAndRemove({_id: id}, (err, result) => {
  //   console.log(result)
  //     if (!result) {
  //       res.status(400).json({message: "Uh oh it seems this shot does not exist or has already been deleted!"})
  //     }
  //   res.status(400).json({message: "Your shot has been deleted."})
  // })
})

module.exports = router;