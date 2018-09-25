const express = require('express');
const router = express.Router();

const {Post} = require('../../models/Post');
const {User} = require('../../models/User');

const auth = require('../middleware/auth')


// GET:
router.get('/shots', (req, res) => {
  Post.find({}).limit(20).exec((err, results) => {
    if (err) return res.status(400).json({message: "There is an error", err})
    res.status(200).send(results)
  })
});

router.get('/shots/:slug', (req, res) => {
  let slug = req.params.slug;
  Post.find({slug: slug}).exec((err, result) => {
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
      // user.posts.push(post)
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
  User.find({username: user}).populate('posts')
  .then((user) => {
    console.log(user[0].username)
    if (user[0].posts.length < 1) {
      res.status(400).json({message: `${user[0].username} has yet to post up any shots!`})
    } else {
      res.status(200).json(user[0].posts)
    }
  })
})

// UPDATE:

router.put('/shots/:slug', auth, (req, res) => {
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

router.delete('/shots/:id', auth, (req, res) => {
  let id = req.params.id
  User.findById(req.user.id, (err, user) => {
    Post.findOneAndDelete({_id: id}).then((post) => {
      console.log(post)
      if (post.user.toString() !== req.user.id) {
        res.status(400).json({message: "You are not authorized to edit this shot!"})
      }
       res.status(200).json({message: "Your shot has been deleted!"})
    }).catch((err) => console.log("Could not find post, perhaps it's been deleted?"))
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