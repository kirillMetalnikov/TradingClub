var path = process.cwd()
var UsersHundler = require('../controllers/users')

module.exports = (app) => {
  var usersHundler = new UsersHundler()
  app.route('/')
    .get((req, res) => {
      res.sendFile(path + '/client/public/index.html')
    })

  app.route('/users/')
    .get(usersHundler.getUsers)
    .post(usersHundler.newUser)
}
