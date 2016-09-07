/**
 * Created by Felipe on 06-09-2016.
 */

var LocalStrategy   = require('passport-local').Strategy;
/**Tirar conexión mysql a un archivo database.js en la carpeta config**/
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database : 'inforganizador'
});

/**Usar Modelo de usuario**/
var user = require("../app/models/user");

// expose this function to our app using module.exports

module.exports = function(passport) {

    /**Serializar y deserializar**/
    passport.serializeUser(function(user, done) {
        done(null, user.Username);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        console.log("soy una weá mala en deserialize");
        console.log(id);
        console.log("select * from user where Username = '"+id +"'");
        connection.query("SELECT * FROM `user` WHERE `Username` = '"+id +"'",function(err,rows){
            if(err){
                console.log("caidabroootal");
                done(err);
            }
            console.log(rows[0]);
            done(err, rows[0].Username);
        });
    });

/**Registro local**/

    passport.use('local-signup', new LocalStrategy({
            usernameField : 'Username',
            passwordField : 'Password',
            /**Campos obtenidos por framework**/
            passReqToCallback : true // paso de mensajes
        },
        function(req, Username, Password, done) {
            var Nombre = req.body.Nombre;
            var Apellido = req.body.Apellido;
            var Email = req.body.Email;
            /**Recolectar información de un form html**/
            /**Verificación de existencia de usuario**/
            connection.query("select * from user where Username = '"+Username+"'",function(err,rows){
                console.log(rows);
                console.log("above row object");
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That User is already taken.'));
                } else {

                    /**Crear usuario si no existe**/
                    var newUserMysql = new Object();

                    newUserMysql.Username = Username;
                    newUserMysql.Password = Password; // Falta generar clave hash

                    var insertQuery = "INSERT INTO user ( Username, Password, Nombre, Apellido, Email, Tipo_aprendizaje, Tipo_usuario ) values ('" + Username +"','" + Password +"','"+ Nombre +"','"+ Apellido +"','"+ Email + "', 0, 0)";
                    console.log(insertQuery);
                    connection.query(insertQuery,function(err,rows){
                        newUserMysql.id = rows.insertId;
                        console.log("mecaí en signup");
                        return done(null, newUserMysql);
                    });
                }
            });
        }));

/**Login local**/

    passport.use('local-login', new LocalStrategy({

            usernameField : 'Username',
            passwordField : 'Password',
            passReqToCallback : true
        },
        function(req, Username, Password, done) {

            connection.query("SELECT * FROM `user` WHERE `Username` = '" + Username + "'",function(err,rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'Usuario no encontrado :(.')); //
                }

                // if the user is found but the password is wrong
                if (!( rows[0].Password == Password))
                    return done(null, false, req.flash('loginMessage', 'Clave incorrecta :(.')); //

                // all is well, return successful user
                //console.log("Me caí en login");
                //console.log(rows[0]);
                return done(null, rows[0]);

            });



        }));

};
