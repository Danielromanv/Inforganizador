/**
 * Created by Felipe on 06-09-2016.
 */

var LocalStrategy   = require('passport-local').Strategy;

var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database : 'inforganizador'
});

//connection.query('USE vidyawxx_build2');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("select * from users where id = "+id,function(err,rows){
            done(err, rows[0]);
        });
    });


    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'Username',
            passwordField : 'Password',
            nombreField : 'Nombre',
            apellidoField : 'Apellido',
            emailField: 'Email',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, Username, Password, Nombre, Apellido, Email, done) {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query("select * from user where Username = '"+Username+"'",function(err,rows){
                console.log(rows);
                console.log("above row object");
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That User is already taken.'));
                } else {

                    // if there is no user with that User
                    // create the user
                    var newUserMysql = new Object();

                    newUserMysql.Username    = Username;
                    newUserMysql.Password = Password;
                    newUserMysql.Nombre = Nombre;// use the generateHash function in our user model
                    newUserMysql.Apellido = Apellido;
                    newUserMysql.Email = Email;
                    var insertQuery = "INSERT INTO user ( Username, Password, Nombre, Apellido, Email ) values ('" + Username +"','" + Password +"','"+ Nombre +"','"+ Apellido +"','"+ Email +"')";
                    console.log(insertQuery);
                    connection.query(insertQuery,function(err,rows){
                        newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql);
                    });
                }
            });
        }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'Username',
            passwordField : 'Password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form

            connection.query("SELECT * FROM `user` WHERE `Username` = '" + Username + "'",function(err,rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!( rows[0].Password == Password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);

            });



        }));

};
