const jwt = require("jsonwebtoken");
const config = require('config');

module.exports = function(req, res, next) {
    
    let token = req.header('Authorization');
    if(!token) return res.status(401).send('Acess Denied. No token provided.');
    
    try {
        token = token.substring(7, token.length);
        const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decodedPayload;
        next();
    }
    catch(ex) {
        res.status(400).send('Invalid Token');
    }
}