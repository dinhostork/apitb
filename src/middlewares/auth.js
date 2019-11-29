const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader)
    return res.status(401).send({error: 'O token não foi informado'});

    const parts = authHeader.split(' ');
    if(parts.length !== 2) return res.status(401).send({error: 'Erro no Token'})

    const [scheme, token] = parts;
    if(!(/\b(\w*Bearer\w*)\b/g.test(scheme)))
        return res.status(401).send({ error: 'Token Malformmated' })
   
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err)  return res.status(401).send({error: 'Token inválido'});
        req.userId = decoded.id;
        req.userName = decoded.name;
        return next();
    });
}