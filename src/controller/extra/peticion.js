const https = require('https');
const axios = require('axios');

const instance = axios.create({
httpsAgent: new https.Agent({  
    rejectUnauthorized: false
})
});

const peticion = {};

peticion.enviarPost = async(url, req) => {
    
    return new Promise(function (resolve, reject) {
        let datos = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    
        instance.post(
            url,
            datos, {
                headers: req.headers
              }
        ).then(function (response) {
            if(response.status !== 200)
                reject(error);
            resolve(response.data);
        }).catch(function (error) {
            reject(error);
        });
    });
}

peticion.enviarPostText = async(url, req) => {
    
    return new Promise(function (resolve, reject) {
        let datos = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
        instance.post(
            url,
            datos, {
                headers: {
                    "api-token" : req.headers["api-token"],
                    "Content-Type": "text/plain"
                }
              }
        ).then(function (response) {
            if(response.status !== 200)
                reject(error);
            resolve(response.data);
        }).catch(function (error) {
            reject(error);
        });
    });
}

peticion.enviarGet = async(url, req) => {
    return new Promise(function (resolve, reject) {
        instance.get(
            url,
            { headers: req.headers, },
        ).then(function (response) {
            if(response.status !== 200) {
                console.log('ocurrio un error')
                reject(error);
            }
            resolve(response.data);
        }).catch(function (error) {
            console.log('ocurrio un error')
            reject(error);
        });
    });
}

module.exports = peticion;