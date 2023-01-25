// const express = require("express");
// const cors = require("cors");
// const bodyParser = require('body-parser');
// const Token = require('../extra/token');
// const ErrorDefinido = require('../extra/errorDefinido');

// const rutasProtegidas = express.Router();
// const rutaVerificar = express.Router();
// const rutaVerificaPorString = express.Router();
// // middlewares para preprocesado de las peticiones de tipo json y url encoded
// const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({ extended: true });
// const textParser = bodyParser.text();

// module.exports = app => {
//   app.set("port", 8084);
//   app.use(cors());
//   app.use(function (req, res, next) {
//     //Enabling CORS 
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
//     next();
//   });
//   app.use(jsonParser);//json
//   app.use(bodyParser.text());
//   app.use(urlencodedParser);

//   // const verificaIdentidad = rutasProtegidas.use(async (req, res, next) => {
//   //   const token = req.headers["access-token"];
//   //   if (token) {
//   //     Token.verificar(token, req, res, next);
//   //   } else {
//   //     res.json({
//   //       msg: 'err',
//   //       mensaje: "INVALID_TOKEN_ID"
//   //     });
//   //   }
//   // });

//   // const verificarApi = rutaVerificar.use(async (req, res, next) => {
//   //   const token = req.headers["api-token"];
//   //   if (token) {
//   //     Token.verificarApi(token, req, res, next);
//   //   } else {
//   //     res.json({
//   //       msg: 'err',
//   //       mensaje: "INVALID_API_TOKEN_API",
//   //       token
//   //     });
//   //   }
//   // });

//   const verificarTokenString = rutaVerificaPorString.use(async (req, res, next) => {
//     const token = req.headers["api-token"];
//     try {
//       if (token !== 'QVkROqUFaNNCTEm6FhDG1Hj0YaZYZOt5') throw new ErrorDefinido('INVALID_TOKEN');
//       next();
//     } catch (err) {
//       res.json({
//         msg: 'err',
//         mensaje: "INVALID_API_TOKEN_STRING",
//         token
//       });
//     }
//   });

//   require('../rutas/ventas_transferencias_electronicas/ventas')(app, verificarTokenString);

//   // app.get('*', function (req, res) {
//   //   res.status(404);
//   //   res.json({ msg: 'err', data: new ErrorDefinido({ nombre: 'Error', descripcion: 'Ruta no existe' }) });
//   // });
//   // app.post('*', function (req, res) {
//   //   res.status(404);
//   //   res.json({ msg: 'err', data: new ErrorDefinido({ nombre: 'Error', descripcion: 'Ruta no existe' }) });
//   // });
//   return app;
// };


const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');


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

  // Llamado a cada una de las rutas definidas en cada archivo de rutas
  require('../rutas/ventas_transferencias_electronicas/ventas')(app);
  return app;
};
