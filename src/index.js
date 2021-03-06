const express = require('express') //servidor http
const bodyparser = require('body-parser') //post
const cors = require('cors') //recurso
const app = express() //instanciou
const port = 3333

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false })) //parametros
app.use(cors()) //origem

require('./controllers/authController')(app) //importa o auth
require('./controllers/booksController')(app) //importa o controlador de livros

app.listen(port) //escuta a porta
console.log('escutando a porta', port)