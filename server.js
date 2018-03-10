var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

var routes = require('./app/routes')

var app = express()
var path = process.cwd()

mongoose.connect(process.env.MONGO_URI)
//mongoose.Promise = global.Promise

app.use(bodyParser.json())

app.use('/client', express.static(path + '/client'))
app.use('/public', express.static(path + '/client/public'))

routes(app)

var port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Node.js is listening on port ${port}`)
})
