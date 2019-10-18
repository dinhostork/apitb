const express = require('express') //servidor http
const bodyparser = require('body-parser') //post
const cors = require('cors') //recurso
const app = express() //instanciou
const port = 3333

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false })) //parametros
app.use(cors) //origem
app.listen(port) //escuta a porta
console.log('escutando a porta', port)