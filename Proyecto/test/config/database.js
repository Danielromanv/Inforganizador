/**
 * Created by Felipe on 06-09-2016.
 */
var mysql = require('mysql');

var conexionDB = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database : 'inforganizador'
});

module.exports = conexionDB;
