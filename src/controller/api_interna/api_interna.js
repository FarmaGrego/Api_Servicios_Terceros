const request = require('request');
const pool = require('../../../src/connection/database');
const { baseURL, ApiToken } = require('../../server/credenciales_api_interna');

const api_interna = {};

api_interna.enviarFSGget = (req, res) => {

    let url = req.params.url + req.params[0];

    let body = {
        ...req.body,
    };

    let header = { 'content-type': 'application/json', 'api-token': ApiToken };
    request.get({
        headers: header,
        url: `${baseURL}${url}`,
        body: JSON.stringify(body)
    }, function (error, response, body) {
        if (error)
            res.json({ msg: "error", error });
        res.json(JSON.parse(body));
    });
};

api_interna.enviarFSG = (req, res) => {

    let url = req.params.url + req.params[0];

    let body = {
        ...req.body,
    };

    let header = { 'content-type': 'application/json', 'api-token': ApiToken };
    request.post({
        headers: header,
        url: `${baseURL}${url}`,
        body: JSON.stringify(body)
    }, function (error, response, body) {
        if (error)
            res.json({ msg: "error", error });
        res.json(JSON.parse(body));
    });
};
api_interna.enviarDeposito = (req, res) => {



    let url = req.params.url + req.params[0];

    let body = {
        ...req.body,
    };

    let header = { 'content-type': 'application/json', 'api-token': ApiToken };
    request.post({
        headers: header,
        url: `${baseURL}${url}`,
        body: JSON.stringify(body)
    }, function (error, response, body) {
        if (error)
            res.json({ msg: "error", error });
        res.json(JSON.parse(body));
    });
};

api_interna.enviarFSGpriGet = (req, res) => {
    let url = req.params.url + req.params[0];

    let body = {
        ...req.body,
        tokenData: req.decoded.data
    };

    let header = { 'content-type': 'application/json', 'api-token': ApiToken };
    request.get({
        headers: header,
        url: `${baseURL}${url}`,
        body: JSON.stringify(body)
    }, function (error, response, body) {
        if (error)
            res.json({ msg: "error", error });
        res.json(JSON.parse(body));
    });
};

//Obtiene las bodegas por usuario
api_interna.enviarFSGprivateGet = async (req, res,add) => {

    let fecha = req.headers.valuess;
    console.log(fecha);
    console.log(req.decoded.data['Id_Usuario']);
    try {
        let valores = [];
        let actividades = [];
        
        let prueba = await pool.query("select id as id_actividad, bodega from esq_novedades.tbl_asignacion_bodega where id_supervisor = $1 and fk_id_estado = 1 and date(fecha_asignacion)=$2 ", [
            req.decoded.data['Id_Usuario'],
            fecha
        ]);
        /*let prueba2= await pool.query("select fecha_asignacion from esq_novedades.tbl_asignacion_bodega where id_supervisor = $1 and fk_id_estado = 1 and date(fecha_asignacion)=$2 ", [
            req.decoded.data['Id_Usuario'],
            fecha
        ]);
        */
        console.log(prueba.rows);
        for (let i = 0; i < prueba.rows.length; i++) {
            valores.push(prueba.rows[i]["bodega"]);
        }
        for(let i=0; i< prueba.rows.length; i++) {
            actividades.push(prueba.rows[i]["id_actividad"]);

        }
        console.log()
        let nuevoValor = valores.join(",");       
        let url = req.params.url + req.params[0];
        let body = {
            ...req.body,
            tokenData: nuevoValor,
            actividades:actividades,
        };
        let header = { 'content-type': 'application/json', 'api-token': ApiToken };
        request.get({
            headers: header,
            url: `${baseURL}${url}`,
            body: JSON.stringify(body)
        }, function (error, response, body) {
            if (error)
                res.json({ msg: "error", error });
                console.log(JSON.parse(body));
                res.json(JSON.parse(body));         
        });

    } catch (error) {
        console.error(error);
       
    } 
};

api_interna.enviarFSGprivateGetDatosAsignaciones = async (req, res) => {

    let fecha = req.headers.valuess;

    try {
        let valores = [];

        let prueba = await pool.query("select DATE(fecha_asignacion) as fecha_asignacion from esq_novedades.tbl_asignacion_bodega where id_supervisor = $1 and fk_id_estado = 1", [
            req.decoded.data['Id_Usuario'],
        ]);
        res.json(
            {
                data: "ok",
                body: prueba.rows
            }
        );
        /*let prueba2= await pool.query("select fecha_asignacion from esq_novedades.tbl_asignacion_bodega where id_supervisor = $1 and fk_id_estado = 1 and date(fecha_asignacion)=$2 ", [
            req.decoded.data['Id_Usuario'],
            fecha
        ]);
        */

    } catch (error) {
        console.log(error);
    }
};
api_interna.enviarFSGprivateGetDataMenu = async (req, res) => {
    let id_usuario = req.decoded.data.Id_Usuario;


    let url = req.params.url + req.params[0];
    let body = {
        ...req.body,
        tokenData: id_usuario
    };

    let header = { 'content-type': 'application/json', 'api-token': ApiToken };
    request.get({
        headers: header,
        url: `${baseURL}${url}`,
        body: JSON.stringify(body)
    }, function (error, response, body) {
        if (error)
            res.json({ msg: "error", error });
        res.json(JSON.parse(body));

    });
};
api_interna.enviarFSGprivateGetBodega = (req, res) => {
    let url = req.params.url + req.params[0];

    let body = {
        ...req.body,
    };
    let header = { 'content-type': 'application/json', 'api-token': ApiToken };
    request.get({
        headers: header,
        url: `${baseURL}${url}`,
        body: JSON.stringify(body)
    }, function (error, response, body) {
        if (error)
            res.json({ msg: "error", error });
        res.json(JSON.parse(body));

    });
};
api_interna.enviarFSGprivateGetDepositos = (req, res) => {
    let bodegaID = req.decoded.data.id;


    let url = req.params.url + req.params[0];
    let body = {
        cod_usuario: req.headers.cod_usuario,
        tokenData: bodegaID
    };

    let header = { 'content-type': 'application/json', 'api-token': ApiToken };
    request.get({
        headers: header,
        url: `${baseURL}${url}`,
        body: JSON.stringify(body)
    }, function (error, response, body) {
        if (error)
            res.json({ msg: "error", error });
        res.json(JSON.parse(body));
        //console.log(JSON.parse(body));

    });
};

api_interna.enviarFSGprivateGetDataDepositos = (req, res) => {
    let bodegaID = req.decoded.data.id;


    let url = req.params.url + req.params[0];
    let body = {
        cod_deposito: req.headers.cod_deposito,
        tokenData: bodegaID
    };

    let header = { 'content-type': 'application/json', 'api-token': ApiToken };
    request.get({
        headers: header,
        url: `${baseURL}${url}`,
        body: JSON.stringify(body)
    }, function (error, response, body) {
        if (error)
            res.json({ msg: "error", error });
        res.json(JSON.parse(body));


    });
};
api_interna.enviarFSGprivateGetCuentasBancarias = (req, res) => {
    let url = req.params.url + req.params[0];

    let header = { 'content-type': 'application/json', 'api-token': ApiToken };
    request.get({
        headers: header,
        url: `${baseURL}${url}`,

    }, function (error, response, body) {
        if (error)
            res.json({ msg: "error", error });
        res.json(JSON.parse(body));
        //console.log(JSON.parse(body));

    });
};

api_interna.enviarFSGprivateGetUsuarioBodega = (req, res) => {
    let url = req.params.url + req.params[0];

    let body = req.headers.bodega;
    // console.log(body);
    let header = { 'content-type': 'applic  ation/json', 'api-token': ApiToken, 'bodega': body };
    request.get({
        headers: header,
        url: `${baseURL}${url}`,
        body: JSON.stringify(body)
    }, function (error, response, body) {
        if (error)
            res.json({ msg: "error", error });
        res.json(JSON.parse(body));

    });
};

api_interna.enviarFSGprivateGetMantenimiento = (req, res) => {
    let url = req.params.url + req.params[0];

    let body = {
        ...req.body,
    };
    let header = { 'content-type': 'application/json', 'api-token': ApiToken };
    request.get({
        headers: header,
        url: `${baseURL}${url}`,
        body: JSON.stringify(body)
    }, function (error, response, body) {
        if (error)
            res.json({ msg: "error", error });
        res.json(JSON.parse(body));
    });
};

api_interna.enviarFSGprivate = (req, res) => {
    let url = req.params.url + req.params[0];

    let body = {
        ...req.body,
        tokenData: req.decoded.data
    };


    let header = { 'content-type': 'application/json', 'api-token': ApiToken };
    request.post({
        headers: header,
        url: `${baseURL}${url}`,
        body: JSON.stringify(body)
    }, function (error, response, body) {
        if (error)
            res.json({ msg: "error", error });
        res.json(JSON.parse(body));
    });
};

module.exports = api_interna;