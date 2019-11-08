const mongoose = require('mongoose')
const url = "mongodb+srv://127.0.0.1:27017/tinderbooks"  //ip do sevidor
mongoose.connect(url)

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao banco de dados')
})

mongoose.connection.on('error', (err) => {
    console.log('erro ao conectar ao banco de dados', err)
})

mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada ao banco de dados')
})

module.exports = mongoose
