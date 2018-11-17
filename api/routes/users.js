const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')

const { User } = require("../../models/User");

const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const cloudConfig = require('../../config/cloudinary');

cloudinary.config({
  cloud_name: cloudConfig.cloud_name,
  api_key: cloudConfig.api_key,
  api_secret: cloudConfig.api_secret
})

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'drybbble_uploads/avatars',
  allowed_formats: ['jpeg', 'jpg', 'png', 'gif'],
  transformation: [{ width: 90, height: 90, crop: "imagga_scale" }]
})

const parser = multer({storage: storage})

// URL -> localhost:3851/api/u

// POST:

//MENTAL NOTE, TO SAVE MYSELF 3HRS OF ANGER, PLEASE ACCESS ERR.MESSAGE FOR ALL CUSTOM ERRORS PASSED BY PRE/POST/VALIDATE FFS!!!
router.post("/register", (req, res) => {
  const username = req.body.username
  const email = req.body.email
  User.findOne({$or:[{username}, {email}]}, (err, result) => {
    if (null != result) {
      if (email === result.email) {
        res.status(409).json({message: `The email ${email} is already in use, please choose another`});
      } else if (username === result.username) {
        res.status(409).json({message: `The username ${kusername} is already in use, please choose another.`})
      } 
    }
    User.create(req.body)
      .then(user => {res.status(200).json({
            message: `You have been signed up with the username ${username}!`
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

router.put('/:id', auth, parser.single('avatar'), (req, res) => {
  console.log(req)
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
