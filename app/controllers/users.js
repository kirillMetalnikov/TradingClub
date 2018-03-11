var User = require('../models/User')

function UsersHundler() {
  this.getUsers = function (req, res) {
    User
      .find()
      .exec( (err, result) => {
        if (err) {
          res.json({type: 'error', error: err})
        }
				res.json(result)
      })
  }

  this.current = function (req, res) {
    if (req.user == undefined) {res.json({user: false})
    } else {
      User
        .findOne({_id: req.user._id})
        .exec( (err, result) => {
          if (err) { throw err }
          res.json({user: result})
        })
    }
  }

  this.signup = function (req, res, next) {
    var newUser = new User()
    var {name, email, password} = req.body
    console.log(name, email, password)
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
