const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET;

exports.generarJWT = (data) => {
    return jwt.sign({
        data: data
      }, secret, { expiresIn: '4h' })
}

exports.generarJWTManejoTareas = (data) => {
    return jwt.sign({
        data: data
      }, secret, { expiresIn: '4h' })
}

exports.comprobarJWT = (token, req, res, next) => {
    try {
        jwt.verify(token, secret, (err, decoded)=>{
            if(err){
                return res.json({ 
                    msg: 'err',
                    mensaje: 'INVALID_TOKEN_AC_VERIFY',
                    error: err
                }) 
            }else{
                req.decoded = decoded
                next()
            }
                
        })
    } catch(err) {
        return res.json({
            msg: 'err',
            mensaje: 'INVALID_TOKEN_AC_ERR',
            error: err
        })
    }
}