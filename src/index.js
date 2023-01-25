var path = require('path');
global.appRoot = path.resolve(__dirname);
require('dotenv').config();

const express = require('express');
const http = require('http');
const config = require('./server/configuracion');


const app = config(express());
const server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log("server on port ", app.get('port'));
});

