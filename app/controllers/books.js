var axios = require('axios')

var urlBooksAPI = `https://www.googleapis.com/books/v1/volumes?fields=kind,items(volumeInfo/title,volumeInfo/authors,volumeInfo/description,volumeInfo/imageLinks/thumbnail)&maxResults=1&key=${process.env.GOOGLE_API_KEY}&q=`

function BooksHundler() {
  this.search = function (req, res) {
//    var {search} = req.body
  var search = 'react'
  axios
    .get(urlBooksAPI+search)
    .then( res => {
      var {title, authors, description, imageLinks: {thumbnail}} = res.data.items[0].volumeInfo
      console.log(title, authors, description, thumbnail)
    })
  }
}

module.exports = BooksHundler
