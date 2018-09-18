const express = require('express');
const router = express.Router();

const {Post} = require('../../models/Post');
const {User} = require('../../models/User');

router.get('/shots', (req, res) => {
  Post.find({}).limit(20).exec((err, results) => {
    if (err) return res.status(400).json({message: "There is an error", err})
    res.status(200).send(results)
  })
});

router.post('/shots/new', (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body
  });
  post.save()
    .then(result => res.status(200).json({message: "Post successfully posted"}))
    .catch(err => res.status(400).json({message: err.message}))
})

router.get('/shots/:slug', (req, res) => {
  let slug = req.params.slug;
  console.log(slug)
  Post.findBySlug({slug: slug}).exec((err, result) => {
    if (err) return res.status(400).json({message: "Post does not exist or has been deleted by the user"})
    res.status(200).send(result)
  })
})

router.put('/shots/:id', (req, res) => {
  let id = req.params.id
  Post.findOneAndUpdate({_id: id}, {$set:req.body}, {new: true}, (err, result) => {
    if (err) res.status(400).send(err)
    res.status(200).send(result)
  })
});

module.exports = router;