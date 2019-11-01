const express = require('express')
const router = express.Router()
 
router.get('/ola', async (req, res) => {
    return res.status(200).send({ok: true})
} )

module.exports = app => app.use('/auth', router)