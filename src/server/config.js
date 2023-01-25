const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const { comprobarJWT } = require('../controller/extra/jwt');


const rutasProtegidas = express.Router();
// middlewares para preprocesado de las peticiones de tipo json y url encoded
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

module.exports = app => {
  app.set("port", 8084);
  app.use(cors());
  app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
  });
  app.use(jsonParser);//json
  app.use(bodyParser.text());
  app.use(urlencodedParser);
  // middleware para que las rutas protegidas requieran el uso de el access-token
  const autorizacion = rutasProtegidas.use(async (req, res, next) => {
    const token = req.headers["access-token"];

    if (token) {
      comprobarJWT(token, req, res, next);
    } else {
      res.json({
        msg: 'err',
        mensaje: "INVALID_TOKEN_AC"
      });
    }
  });

  require("../routes/ventas_transferencias_electronicas/ventas")(app);
  return app;
};
