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

  this.newUser = function (req, res) {
    var newUser = new User()
    var {name, email, login, password} = req.body
    newUser.profile = {name, email, login, password}
    newUser.save(err => {
      if (err) {
        res.json({type: 'error', error: err})
      }
      res.redirect('/')
    })
  }
}

module.exports = UsersHundler
