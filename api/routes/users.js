const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')

const { User } = require("../../models/User");

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

// DELETE:

router.delete("/:id", auth, (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove({ _id: id }, (err, result) => {
    if (err) return res.status(400).json({ message: err.error });
    res
      .status(200)
      .json({ message: "Sorry to see you go! Your account has been successfully deleted" });
  });
});

module.exports = router;
