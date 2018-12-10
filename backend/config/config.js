const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGO_URI
  },
  default: {
    SECRET: 'jldkfaienldfnefe',
    DATABASE: 'mongodb://localhost:27017/drybbble'
  }
}

exports.get = function get(env) {
  return config[env] || config.default
}