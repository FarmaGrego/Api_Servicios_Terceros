const { Router } = require("express");


const router = Router();

const { ventas } = require("../../controladores/ventas_transferencias_electronicas/ventas");

module.exports = (app) => {
  router.post('/apifsg-pr/:url*', ventas.enviarFSGprivate);
  app.use(router);
};