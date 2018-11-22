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
router.post("/register", async (req, res, next) => {
  const username = req.body.username
  const email = req.body.email

  let _user = await User.findOne({$or:[{username}, {email}]})

  console.log(_user)

  try {
    if (null != _user) {
      if (email === _user.email) {
        return next({status: 400, message: `The email ${email} is already in use, please choose another`})
      } else if( username === _user.username) {
        return next({status: 409, message: `The username ${username} is already in use please choose another.`})
      }
    }
    User.create(req.body)
    return res.status(200).json({message: `You have been signed up with the username: ${username}`})
  } catch (err) {
    next(err)
  }

  // User.findOne({$or:[{username}, {email}]}, (err, result) => {
  //   if (null != result) {
  //     if (email === result.email) {
  //       res.status(409).json({message: `The email ${email} is already in use, please choose another`});
  //     } else if (username === result.username) {
  //       res.status(409).json({message: `The username ${kusername} is already in use, please choose another.`})
  //     } 
  //   }
  //   User.create(req.body)
  //     .then(user => {res.status(200).json({
  //           message: `You have been signed up with the username ${username}!`
  //       })
  //     })
  //     .catch(err => res.status(409).json(err.message)); //<- THE .MESSAGE IS VERY IMPORTANT!!!
  // })
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
router.get('/:user', async (req, res, next) => {
  let opt = {path: 'posts', select: ['id', 'title', 'body', 'userShot']}
  let _user = req.params.user
  let user = await User.findOne({username: _user}).populate(opt)

  try {
    if (user === null || !user) {
      return next({status: 400, message: `Oh dear, it seems there is no user by the name of ${_user}`})
    } else {
      res.status(200).json(user)
    }
  } catch (err) {
    next(err)
  }
  
  // User.find({username: user}).populate()
  // .then((user) => {
  //   res.status(200).json(user[0])
  // }).catch(err => console.log(err))
})

// Update Profile

// router.put('/:id', auth, parser.single('avatar'), (req, res) => {
//   console.log(req)
// })


// DELETE:

router.delete("/:id", auth, async (req, res, next) => {
  const _id = await req.params.id;
  let _user = await User.findById({_id})
  // console.log(req.user.id, _user._id)

  try {
    if  (_user === null || !_user) {
      return next({status: 400, message: "Hmm, it seems you've stumbled into no man's land"})
    } else if (_user._id.toString() !== req.user.id) {
      return next({status: 401, message: "Oops, you're not authorized to do that Starfox"})
    } else if (_user._id.toString() === req.user.id) {
      // _user.delete()
      return res.status(200).json({message: "Your account has been deleted"})
    }
  } catch (err) {
    next(err)
  }

  // console.log(_user)

  // User.findById(req.params.id, (err, user) => {

  //   if (user === undefined || !user) {
  //     return res.status(400).json({message: "Fuck"})
  //   } else if (err) { 
  //     return json(err.message)
  //   }
  //   if (user.id !== req.user.id) {
  //     return res.status(400).json({message: "You are not authorized to delete soemone else's account!"})
  //   }
  //   user.delete()
  //     .then(result => res.status(200).json({message: "Your account has been successfully deleted, we're sorry to see you go!"}))
  //     .catch(err => console.log(err))
  //   // if (err) return res.status(400).json({ message: err.error });
  //   // res
  //   //   .status(200)
  //   //   .json({ message: "Sorry to see you go! Your account has been successfully deleted" })
  // }).catch(err => res.status(400).json({message: "Uh oh, it seems something went wrong!", error: err}));
});

module.exports = router;
