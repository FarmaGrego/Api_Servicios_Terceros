const https = require('https');
const axios = require('axios');

const instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

const request = require('request');

const auxiliares = {};

auxiliares.enviarPeticion = async (url, req) => {
    return new Promise(function (resolve, reject) {

        axios({
            method: "post",
            url,
            headers: { ...req.headers },
            data: req.body
            /*timeout: 300000,
            proxy: false,*/
        })
            .then((response) => {
                resolve({
                    response: {
                        headers: response.headers,
                        body: response.data,
                        statusCode: response.status,
                    },
                });
            })
            .catch((error) => {
                if (error.response) {
                    console.error(`SOAP FAIL: ${error}`);
                    reject(error.response.data);
                } else {
                    console.error(`SOAP FAIL: ${error}`);
                    reject(error);
                }
            });
    });
};

auxiliares.enviarPost = async (url, req) => {

    return new Promise(function (resolve, reject) {

        let datos = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

        instance.post(
            url,
            datos, {
            headers: {
                ...req.headers,
            },
            validateStatus: function (status) {
                return status >= 200 && status < 500; // default
            },
        }
        ).then(function (response) {
            resolve(response);
        }).catch(function (error) {
            reject(error);
        });
    });
};

auxiliares.sumarHoras = (numeroHoras, fecha = new Date()) => {
    fecha.setTime(fecha.getTime() + numeroHoras * 60 * 60 * 1000);
    let options = {
        timeZone: 'America/Guayaquil',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
    };
    let formatter = new Intl.DateTimeFormat('en-us', options);
    fecha = formatter.format(fecha);
    return fecha;
};

auxiliares.enviarGet = async (url, req) => {
    return new Promise(function (resolve, reject) {
        instance.get(
            url,
            {
                headers: {
                    ...req.headers,
                },
                validateStatus: function (status) {
                    return status >= 200 && status < 500; // default
                },
            }
        ).then(function (response) {
            /*if(![200,201, 400].includes(response.status))
                reject("error");*/
            resolve(response);
        }).catch(function (error) {
            reject(error);
        });
    });
};

auxiliares.enviarGetData = async (url, req) => {
    return new Promise(function (resolve, reject) {
        instance.get(
            url,
            {
                data: {
                    cadenafarmacia: 6
                },
                headers: {
                    ...req.headers,
                },
                validateStatus: function (status) {
                    return status >= 200 && status < 500; // default
                },
            }
        ).then(function (response) {
            resolve(response);
        }).catch(function (error) {
            reject(error);
        });
    });
};


module.exports = auxiliares;