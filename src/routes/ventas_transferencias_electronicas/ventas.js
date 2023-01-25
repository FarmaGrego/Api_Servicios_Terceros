const { Router } = require("express");


const router = Router();

const { Transferencias } = require("../../controller/all_controllers");

module.exports = (app,verificarTokenString) => {
  router.post('/apifsg-pr/:url*',verificarTokenString, Transferencias.enviarFSGprivate);
  app.use(router);

};