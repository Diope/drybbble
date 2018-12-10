const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const publicKey = fs.readFileSync(path.join(__dirname, '../../config') + '/public.key', 'utf8');
const signOptions = {
  issuer: 'dipet.me',
  expiresIn: '15d',
  algorithm: "RS256"
}

module.exports = (req, res, next) => {
  const tokenSent = req.headers.authorization
  // console.log(tokenSent);
  if (tokenSent) {
    const token = tokenSent.split(" ")[1]
    // console.log(token);
    jwt.verify(token, publicKey, signOptions, (err, decoded) => {
      req.user = decoded
      next()
    })
  } else {
    return res.status(401).json({message: "Unauthorized access, please sign up or login"})
  }
}