const { Router } = require("express");


const router = Router();

const { Transferencias } = require("../../controller/all_controllers");

module.exports = (app) => {
  router.post('/apifsg-pr/:url*', Transferencias.enviarFSGprivate);
  app.use(router);

};