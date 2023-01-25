const { Router } = require("express")
const router = Router()

const {
    ClienteAdmin,
    ApiInterna
  } = require("../controller/all_controllers")

module.exports = (app) => {
   // router.post('/atencion_cliente/autenticar-usuario', ClienteAdmin.autenticarUsuario);
    app.use(router)
}