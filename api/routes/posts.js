const express = require('express');
const router = express.Router();

const {Post} = require('../../models/posts');

router.get('/posts', (req, res) => {
  Post.find({}).limit(20).exec((err, results) => {
    if (err) return res.status(400).json({message: "There is an error", err})
    res.status(200).send(results)
  })
});

router.post('/post/new', (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body
  });
  post.save()
    .then(result => res.status(200).json({message: "Post successfully posted"}))
    .catch(err => res.status(400).json({message: err.message}))
})

router.put('/post/:id', (req, res) => {
  let id = req.params.id
  Post.findOneAndUpdate({_id: id}, {$set:req.body}, {new: true}, (err, result) => {
    if (err) res.status(400).send(err)
    res.status(200).send(result)
  })
})

module.exports = router;