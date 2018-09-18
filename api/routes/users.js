const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const { User } = require("../../models/User");

const SALT_ROUNDS = 14;

router.post("/register", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user >= 1) {
        res
          .status(409)
          .json({
            message: `The email ${
              req.body.email
            } is already in use, pleas try another email.`
          });
      } else {
        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        });
        user
          .save()
          .then(result => {
            res.status(200).json({ message: "User created" });
          })
          .catch(err => {
            res.status(409).json({message: "Email already in use"});
          });
      }
    });
});

module.exports = router;
