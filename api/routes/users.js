const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const {User} = require('../../models/User');

const SALT_ROUNDS = 13;

router.post('/register', (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  bcrypt.hash(user.password, SALT_ROUNDS, (err, hash) => {
    User.create({
      username: user.username,
      email: user.email,
      password: hash
    })
    .then((result) => {res.status(200).json({message: "Saved success", result})})
    .catch((err) => {res.status(400).json({message: err.message})})
  })
  
});

module.exports = router;