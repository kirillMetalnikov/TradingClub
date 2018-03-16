var mongoose = require('mongoose')

var Book = new mongoose.Schema({
    title: {type: String, required: true},
    authors: {type: Array, required: true},
    thumbnail: String,
    description: String,
    owner: {type: String, required: true},
    trade: {from: String, aproved: Boolean}
})

module.exports = mongoose.model('Book', Book)
