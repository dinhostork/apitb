const express = require('express')
const router = express.Router()
 const User = require('../models/user')
 const bcript = require('bcryptjs');
 const jwt = require('jsonwebtoken');
 const crypto = require('crypto');
 const authConfig = require('../config/auth');

 function geradordeToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    } );
}


router.post('/login', (req, res) => {
    const { email, password } = req.body
    
})

router.post('/register', async (req, res) => {
//    const { username, email, password } = req.body 
    //verificações de existencia   

    const { email } = req.body;
    try {
        if(await User.findOne({ email }))
        return res.status(400).send({ error: 'Já existe um usuário com esse e-mail' });

        const user = await User.create(req.body);
        user.password = undefined;
        return res.send({ 
            user,
            token: geradordeToken({id: user.id, name: user.name}),
	
         });
	
    } catch (err){
        return res.status(400).send({ error: 'Falha no Registro '+ err });
    }
})

router.post('/forget', (req, res) => {
    const { email } = req.body
    //verificações de existencia
})

router.post('/reset', (req, res) => {
    //verificar se o código confere
})



module.exports = app => app.use('/auth', router)