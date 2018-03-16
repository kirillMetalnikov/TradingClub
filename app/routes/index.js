var path = process.cwd()
var UsersHundler = require('../controllers/users')
var BooksHundler = require('../controllers/books')

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.json({user: false, message: {type: 'login', text: 'You need login'}})
  }
}

module.exports = (app, passport) => {
  var usersHundler = new UsersHundler()
  var booksHundler = new BooksHundler()

  app.route('/')
    .get((req, res) => {
      res.sendFile(path + '/client/public/index.html')
    })

  app.route('/api/current_user/')
    .get(isLoggedIn, usersHundler.current)

  app.route('/api/books/')
    .get(isLoggedIn, booksHundler.getAll)
  app.route('/api/books/your')
    .get(isLoggedIn, booksHundler.getYour)
  app.route('/api/books/')
    .post(isLoggedIn, booksHundler.add)
  app.route('/api/books/')
    .delete(isLoggedIn, booksHundler.delete)

  app.route('/api/profile')
    .put(isLoggedIn, usersHundler.changeProfile)
  app.route('/api/password')
    .put(isLoggedIn, usersHundler.changePassword)

  app.route('/auth/logout')
    .get((req, res) => {
        req.logout()
        res.redirect('/')
    })

  app.route('/auth/signup')
    .post(usersHundler.signup)

  app.route('/auth/login')
    .post(passport.authenticate('local', { failWithError: true }),
      (req, res) => {
        res.json({user: req.user})
      },
      (err, req, res, next) => {
        if (req.authErr) {
          res.send({message: req.authErr})
        }
      }
    )
}
