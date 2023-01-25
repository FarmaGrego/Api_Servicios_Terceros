const { Router } = require("express");


const router = Router();

const { ventas } = require("../../controladores/ventas_transferencias_electronicas/ventas");

module.exports = (app, verificarTokenString) => {
  router.post('/apifsg-pr/:url*', verificarTokenString, ventas.enviarFSGprivate);
  app.use(router);

};