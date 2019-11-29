const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/tinderbooks"  //ip do sevidor

const options = {useUnifiedTopology: true,  reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };
mongoose.set('useFindAndModify', false);
//mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
 
mongoose.connect(url, options)

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
