const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')

const { User } = require("../../models/User");

// URL -> localhost:3851/api/u

// POST:

//MENTAL NOTE, TO SAVE MYSELF 3HRS OF ANGER, PLEASE ACCESS ERR.MESSAGE FOR ALL CUSTOM ERRORS PASSED BY PRE/POST/VALIDATE FFS!!!
router.post("/register", (req, res) => {
  const username = req.body.username
  const email = req.body.email
  User.findOne({$or:[{username: username}, {email: email}]}, (err, result) => {
    if (null != result) {
      if (req.body.email === result.email) {
        res.status(409).json({message: `The email ${req.body.email} is already in use, please choose another`});
      } else if (req.body.username === result.username) {
        res.status(409).json({message: `The username ${req.body.username} is already in use, please choose another.`})
      } 
    }
    User.create(req.body)
      .then(user => {res.status(200).json({
            message: `You have been signed up with the username ${user.username}!`
        })
      })
      .catch(err => res.status(409).json(err.message)); //<- THE .MESSAGE IS VERY IMPORTANT!!!
  })
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
    res.status(200).json(user[0])
  }).catch(err => console.log(err))
})

// Update Profile

router.put('/:id', auth, (req, res) => {
  User.findByIdAndUpdate({_id: req.params.id}).then((user) => {
    console.log(user)
    if (user.id !== req.user.id) {
      return res.status(400).json({message: "You are not authorized to edit this User profile."})
    }
    user.update(req.body).then(result => console.log(result))
  }).catch(err => console.log(err.message))
})


// DELETE:

router.delete("/:id", auth, (req, res) => {
  const id = req.params.id;
  User.findById({ _id: id }, (err, user) => {
    if (err) res.status(200).json({message: "Uh oh, it seems something went wrong!"})
    if (user.id !== req.user.id) {
      return res.status(400).json({message: "You are not authorized to delete soemone else's account!"})
    }
    user.delete()
    .then(result => res.status(200).json({message: "Your account has been successfully deleted, we're sorry to see you go!"}))
    .catch(err => console.log(err))
    // if (err) return res.status(400).json({ message: err.error });
    // res
    //   .status(200)
    //   .json({ message: "Sorry to see you go! Your account has been successfully deleted" })
  });
});

module.exports = router;
