const express = require('express')
const router = express.Router()
 
router.post('/login', (req, res) => {
    const { email, password } = req.body
    
})

router.post('/register', (req, res) => {
    const { username, email, password } = req.body 
    //verificações de existencia   
})

router.post('/forget', (req, res) => {
    const { email } = req.body
    //verificações de existencia
})

router.post('/reset', (req, res) => {
    //verificar se o código confere
})



module.exports = app => app.use('/auth', router)