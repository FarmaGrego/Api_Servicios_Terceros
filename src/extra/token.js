const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const Token = {}

Token.generar = (data) => {
    return jwt.sign({data}, secret, { expiresIn: '1h' });
};

Token.generarMovil = (data) => {
    return jwt.sign({data}, secret, { expiresIn: '365d' });
};


Token.verificar = (token, req, res, next) => {
    try {
        jwt.verify(token, secret, (err, decoded)=>{
            if(err)
                throw err;
            req.decoded = decoded;
            next();
        })
    } catch(err) {
        return res.json({
            msg: 'err',
            mensaje: 'INVALID_TOKEN',
            data: err
        });
    }
};

Token.verificarApi = (token, req, res, next) => {
    try {
        if (token !== 'apitoken')
            throw new Error('INVALID_TOKEN');
        next();
    } catch(err) {
        return res.json({
            msg: 'err',
            mensaje: 'INVALID_TOKEN',
            data: err
        });
    }
}

module.exports = Token;