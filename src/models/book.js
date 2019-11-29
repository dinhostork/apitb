const mongoose = require('../database')
//arquivo para o esquema de banco de dados dos livros

const bookSchemma = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },  
})


const Book = mongoose.model('Books', bookSchemma);

module.exports = Book;