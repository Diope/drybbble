const express = require('express');
const router = express.Router();

const {Post} = require('../../models/Post');
const {User} = require('../../models/User');

const auth = require('../middleware/auth')


// GET:
router.get('/shots', auth, (req, res) => {
  Post.find({}).limit(20).exec((err, results) => {
    if (err) return res.status(400).json({message: "There is an error", err})
    res.status(200).send(results)
  })
});

router.get('/shots/:slug', (req, res) => {
  let slug = req.params.slug;
  Post.findBySlug({slug: slug}).exec((err, result) => {
    if (!result) return res.status(400).json({message: "Shot does not exist or has been deleted by the user"}) 
    res.status(200).json(result)
  })
})

// POST:

router.post('/shots/new', auth, (req, res) => {
  console.log(req.user.id)
  User.findById(req.user.id, (err, user) => {
    if (err) res.status(400).json({message: err})
    const newPost = {
      title: req.body.title,
      body: req.body.body,
      user: req.user.id
    }
    Post.create(newPost, (err, post) => {
      if (err) res.status(400).json({message: "Your shot could not be created"})
      user.posts.push(post)
      user.save()
        .then((result) => {
          res.status(200).json(result)
        })
        .catch((err) => {
          res.status(400).json(err)
        })
      })
  })
  // User.findById(req.body.user, (err, user) => {
  //   if (err) res.status(400).json({message: err.message})
  //   // console.log(user)
  //   const newPost = {
  //     title: req.body.title,
  //     body: req.body.body,
  //     user: user.id
  //   }
  //   // console.log(newPost)
  //   Post.create(newPost, (err, post) => {

  //     if (err) res.status(400).json({message2: err})
  //     user.posts.push(post)
  //     user.save()
  //       .then((result) => {
  //         res.status(200).json(result)
  //       })
  //       .catch((err) => {
  //         res.status(400).json(err)
  //       })
  //   })
  // })
})

router.get('/shots/u/:user', (req, res) => {
  let user = req.params.user
  User.find({username: user}).populate('posts').then((user) => {
    res.status(200).json(user[0].posts)
  })
})

// UPDATE:

router.put('/shots/:id', (req, res) => {
  let id = req.params.id
  Post.findByIdAndUpdate({_id: id}, {$set:req.body}, {new: true}, (err, result) => {
    if (err) res.status(400).send(err)
    res.status(200).send(result)
  })
});

// DELETE:

router.delete('/shots/:id', (req, res) => {
  let id = req.params.id
  Post.findByIdAndRemove({_id: id}, (err, result) => {
    console.log(result)
      if (!result) {
        res.status(400).json({message: "Uh oh it seems this shot does not exist or has already been deleted!"})
      }
    res.status(400).json({message: "Your shot has been deleted."})
  })
})

module.exports = router;