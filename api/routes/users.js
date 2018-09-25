const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')

const { User } = require("../../models/User");


// POST:
router.post("/register", (req, res) => {
  User.create(req.body)
    .then(user =>
      res.status(200).json({
          message: `You have been signed up with the username ${user.username}!`
      })
    )
    .catch(err => res.status(409).json({ message: err.message }));
});

router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }, function(err, user) {
    if (!user) {
      return res
        .status(400)
        .json({
          message: `Authentication failed, could not find the user ${
            req.body.username
          }`
        });
    }
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.json({
          message: "Authentication failed, password is incorrect"
        });
      } else {
        user.generateJWT((err, token) => {
          if (err) res.status(400).json({message: err.message})
          res.status(200).json({ message: "Logged in successfully", token: token });
        })
      }
    });
  });
});

// GET:
router.get('/:user', (req, res) => {
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


// DELETE:

router.delete("/:id", auth, (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove({ _id: id }, (err, result) => {
    if (err) return res.status(400).json({ message: err.error });
    res
      .status(200)
      .json({ message: "Sorry to see you go! Your account has been successfully deleted" })
  });
});

module.exports = router;
