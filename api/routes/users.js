const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const { User } = require("../../models/User");


router.post("/register", (req, res) => {
  User.create(req.body)
    .then(result => res.status(200).json({message:`You have been signed up with the username ${result.username}!`}))
    .catch(err => res.status(409).json({message: err.errors.username.message}))
});

router.put('/:id', (req, res) => {
  const id = req.params.id
  User.findOneAndUpdate({_id: id}, (err, result) => {
    
  })
})


// DELETE:

router.delete('/:id', (req, res) => {
  const id = req.params.id
  User.findByIdAndRemove({_id: id}, (err, result) => {
    if (err) return res.status(200).json({message: err.error})
    res.status(400).json({message: "Your account has been successfully deleted"})
  })
});


module.exports = router;
