var User = require('../models/User')

function UsersHundler() {
  this.getUsers = function (req, res) {
    User
      .find()
      .exec( (err, result) => {
        if (err) {
          res.json({message: {type: 'error', text: err}})
        }
				res.json(result)
      })
  }

  this.changeProfile = function (req, res) {
    var {name, location} = req.body
    User
      .findByIdAndUpdate(req.user._id, {$set: {name, location}}, {new: true})
      .exec( (err, user) => {
        if (err) { res.json({message: {type: 'error', text: err}}) }
        res.json({user})
      })
  }

  this.changePassword = function (req, res) {
    var {oldPassword, newPassword} = req.body
    User
      .findById(req.user._id)
      .exec((err, user) => {
        if (err) { res.json({message: {type: 'error', text: err}})}
        if(user.password != oldPassword) {
          res.json({message: {type: 'password', text: 'Old password is not match'}})
        } else {
          User
            .findByIdAndUpdate(req.user._id, {$set: {password: newPassword}}, {new: true})
            .exec( (err, user) => {
              if (err) { res.json({tmessage: {type: 'error', text: err}}) }
              res.json({user})
            })
        }
      })
  }

  this.current = function (req, res) {
    User
      .findOne({_id: req.user._id})
      .exec( (err, result) => {
        if (err) { res.json({message: {type: 'error', text: err}}) }
        res.json({user: result})
      })
  }

  this.signup = function (req, res, next) {
    var newUser = new User()
    var {name, email, password} = req.body
    newUser.name = name
    newUser.email = email
    newUser.password = password
    newUser.save( (err, user) => {
      return err
        ? next(err)
        : req.logIn(user, err => {
          return err
            ? next(err)
            : res.json({user})
        })
    })
  }
}

module.exports = UsersHundler
