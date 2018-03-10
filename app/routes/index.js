var path = process.cwd()
var UsersHundler = require('../controllers/users')

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.json({type: 'login', message: 'You need login'})
  }
}

module.exports = (app, passport) => {
  var usersHundler = new UsersHundler()
  app.route('/')
    .get((req, res) => {
      res.sendFile(path + '/client/public/index.html')
    })

  app.route('/users/')
    .get(usersHundler.getUsers)

  app.route('/auth/logout')
    .get(passport.authenticate('local'),
      (req, res) => {
        console.log('logout')
        res.redirect('/')
    })

  app.route('/auth/signup')
    .post(usersHundler.signup)

  app.route('/login')
    .post(passport.authenticate('local', { failureRedirect: '/login' }),
      (req, res) => {
        res.redirect('/yourbooks')
    })
}
