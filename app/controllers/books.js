var axios = require('axios')
var Book = require('../models/Book')

var urlBooksAPI = `https://www.googleapis.com/books/v1/volumes?fields=kind,items(volumeInfo/title,volumeInfo/authors,volumeInfo/description,volumeInfo/imageLinks/thumbnail)&maxResults=1&key=${process.env.GOOGLE_API_KEY}&q=`

function BooksHundler() {
  this.add = (req, res) => {
    var {search} = req.body
    var owner = req.user._id
    axios
      .get(urlBooksAPI+search)
      .then( ({data}) => {
        var {title, authors, description, imageLinks: {thumbnail}} = data.items[0].volumeInfo
//        thumbnail = thumbnail.replace('zoom=1', 'zoom=2')
//        console.log(title, authors, description, thumbnail, owner)
        var newBook = new Book()
        newBook.title = title
        newBook.authors = authors
        newBook.description = description
        newBook.thumbnail = thumbnail
        newBook.owner = owner
        newBook.trade = null

        newBook.save( (err, book) => {
          if(err) { res.json({message: {type: 'error', text: err}}) }
          res.json({book})
        })
      })
    }

  this.getAll = (req, res) => {
    Book
      .find({trade: null})
      .exec((err, books) => {
        if (err) {
          res.json({message: {type: 'error', text: err}})
        }
        res.json({books})
      })
  }

  this.getYour = (req, res) => {
    Book
      .find({owner: req.user._id})
      .exec((err, books) => {
        if (err) {
          res.json({message: {type: 'error', text: err}})
        }
        res.json({books})
      })
  }

  this.delete = (req, res) => {
    var {_id} = req.body
    Book
      .findByIdAndRemove(_id)
      .exec((err, book) => {
        if (err) {
          res.json({message: {type: 'error', text: err}})
        }
        res.json({_id: book._id})
      })
  }

  this.trade = (req, res) => {
    var {_id} = req.body
    var from = req.user._id
    Book
      .findByIdAndUpdate(_id, {$set: {trade: {from, aproved: false}}}, {new: true})
      .exec( (err, book) => {
        if (err) {
          res.json({message: {type: 'error', text: err}})
        }
        res.json({book})
      })
  }

  this.tradeDelete = (req, res) => {
    var {_id} = req.body
    Book
      .findByIdAndUpdate(_id, {$set: {trade: null}}, {new: true})
      .exec( (err, book) => {
        if (err) {
          res.json({message: {type: 'error', text: err}})
        }
        res.json({book})
      })
  }

  this.tradeAprove = (req, res) => {
    var {_id} = req.body
    Book
      .findByIdAndUpdate(_id, {$set: {"trade.aproved": true}}, {new: true})
      .exec( (err, book) => {
        if (err) {
          res.json({message: {type: 'error', text: err}})
        }
        res.json({book})
      })
  }

  this.forYouReq = (req, res) => {
    Book
      .find({owner: req.user._id, trade: { $ne: null }})
      .exec((err, books) => {
        if (err) {
          res.json({message: {type: 'error', text: err}})
        }
        res.json({books})
      })
  }

  this.yourReq = (req, res) => {
    Book
      .find({"trade.from": req.user._id})
      .exec((err, books) => {
        if (err) {
          res.json({message: {type: 'error', text: err}})
        }
        res.json({books})
      })
  }
}

module.exports = BooksHundler
