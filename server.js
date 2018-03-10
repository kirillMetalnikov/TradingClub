var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var passport = require('passport')
var session = require('express-session')
var fallback = require('express-history-api-fallback')


var app = express()
require('./app/config/passport')(passport)
var path = process.cwd()

mongoose.connect(process.env.MONGO_URI)
//mongoose.Promise = global.Promise
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/client', express.static(path + '/client'))
app.use('/public', express.static(path + '/client/public'))
app.use(session({
	secret: process.env.SESSION_KEY,
	resave: false,
	saveUninitialized: true,
	maxAge: 60000,
	expires: 60000
}));
app.use(passport.initialize())
app.use(passport.session())


require('./app/routes')(app, passport)
app.use(fallback(process.cwd() + '/client/public/index.html'))

var port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Node.js is listening on port ${port}`)
})
