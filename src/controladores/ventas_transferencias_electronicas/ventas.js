const request = require('request');
const { baseURL, ApiToken } = require('../../server/credenciales_api_interna');

const ventas = {};

ventas.enviarFSGprivate = (req, res) => {
    let url = req.params.url + req.params[0];

    let body = {
        ...req.body,
        //tokenData: req.decoded.data
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

module.exports = {ventas};