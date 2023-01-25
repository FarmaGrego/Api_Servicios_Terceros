const bcrypt = require('bcrypt')

exports.crearClaveAcceso = async (clave) => {
    // se genera un salt
    const salt = await bcrypt.genSalt(10)
    // se genera un hash de la clave proporcionada
    const hash = await bcrypt.hash(clave, salt)
 
    return hash
}
exports.compararClaveAcceso = async (clave, hash) => {
    const comparacion = await bcrypt.compare(clave, hash)
    return comparacion
}