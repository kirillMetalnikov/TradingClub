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

  app.route('/api/current_user/')
    .get(usersHundler.current)

  app.route('/auth/logout')
    .get((req, res) => {
        req.logout()
        res.redirect('/')
    })

  app.route('/signup')
    .post(usersHundler.signup)

  app.route('/auth/login')
    .post(passport.authenticate('local', { failureRedirect: '/signup' }),
      (req, res) => {
        res.redirect('/yourbooks')
    })
}
