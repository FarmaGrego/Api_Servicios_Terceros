var sqlite3 = require('sqlite3').verbose()
const path = require('path');
const DBSOURCE = path.resolve(__dirname, "db.sqlite")

const base = {};
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
        db.run(`CREATE TABLE tokens (
            token_acceso text,
            token_refresco text,
            token_acceso_exp datetime,
            token_refresco_exp datetime
        )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
            }
        });
    }
});

//convertir sql all a promise

base.consultar = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject({
                    msg: "err",
                    data: err
                });
            }else{
                resolve({
                    msg: "ok",
                    data: rows
                });
            }
        });
    });
}

//convertir sql run a promise
base.ejecutar = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, (err) => {
            if (err) {
                reject({
                    msg: "err",
                    data: err
                });
            }else{
                resolve({
                    msg: "ok"
                });
            }
        });
    });
}


module.exports = base