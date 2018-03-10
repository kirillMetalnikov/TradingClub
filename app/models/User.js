var mongoose = require('mongoose')

var User = new mongoose.Schema({
  profile: {
    name: String,
    email: String,
    login: String,
    password: String
  }
})

module.exports = mongoose.model('User', User)
