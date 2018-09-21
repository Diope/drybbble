const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const { User } = require("../../models/User");


router.post("/register", (req, res) => {
  User.create(req.body)
    .then(result => res.status(200).json({message:`You have been signed up with the username ${result.username}!`}))
    .catch(err => res.status(409).json({message: err.message}))
});

router.post('/login', (req, res, next) => {
  User.findOne({username: req.body.username}, function (err, user) {
    if (user.length > 1) {
      return res.status(400).json({message: `Authentication failed, could not find the user ${req.body.username}`})
    }
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) {
        return res.json({message: "Authentication failed, password is incorrect"})
      } else {
        res.status(200).json({message: "Logged in successfully"})
      }
    })
  })
})


// DELETE:

router.delete('/:id', (req, res) => {
  const id = req.params.id
  User.findByIdAndRemove({_id: id}, (err, result) => {
    if (err) return res.status(400).json({message: err.error})
    res.status(200).json({message: "Your account has been successfully deleted"})
  })
});


module.exports = router;
