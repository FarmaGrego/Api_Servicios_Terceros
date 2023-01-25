const parseString = require('xml2js').parseString;
const xml2js = require('xml2js');
const builder = new xml2js.Builder({rootName :'Envelope'});

const jsxml = {};

jsxml.xmlJS = (xml) => {
    return new Promise((resolve, reject) => {
        parseString(xml, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

jsxml.jsXML = (json) => {
    return builder.buildObject(json);
};

jsxml.objetoVacio = (obj) => {
    return Object.keys(obj).length === 0;
};

module.exports = jsxml;