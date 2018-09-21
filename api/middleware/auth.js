const jwt = require('jsonwebtoken');
const config = require("./config/config").get(process.env.NODE_ENV);

module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.body.token, config.SECRET);
    req.userData = decoded;
    next();
  } catch {
    return res.status(401).json({message: "You are not authorized to perform this action, please log in"})
  }
}