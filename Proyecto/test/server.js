/**
 * Created by Felipe on 22-08-2016.
 */

/**Variables requeridas**/
var express = require('express');
var app = express();
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var morgan = require('morgan');
var session = require('express-session');
var mysql = require('mysql');
var configDB = require('./config/database.js');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database : 'inforganizador'
});

app.use(morgan('dev')); // request por consola
app.use(cookieParser()); // leer cookies
app.use(bodyParser()); // Leer formularios html



//Weás pal passport :(
app.use(session({ secret: 'somushsecretmen'}));
app.use(passport.initialize());
app.use(passport.session()); // Login con sesión
app.use(flash()); // use connect-flash for flash messages stored in session
require('./config/passport')(passport);

/**Rutas... a futuro tirarlas a un archivo routes.js**/
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/Views/index.html');
});

app.get('/demo', isLoggedIn, function (req, res) {
    res.sendfile(__dirname + '/Views/demo.html');
});


app.get('/login', function (req,res) {
    res.sendfile(__dirname + '/Views/login.html', {message: req.flash('loginMessage')});
});

app.post('/login', passport.authenticate('local-login',{
    successRedirect: '/demo',
    failureRedirect: '/login',
    failureFlash : true
}));

app.get('/signup', function (req,res) {
    res.sendfile(__dirname + '/Views/signup.html',{message: req.flash('signupMessage')});
});

app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/login', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

app.get('/encuesta', function (req,res) {
    res.sendfile(__dirname + '/Views/encuesta.html');
})


/**Función que verifica si se está loggeado, redirige a la main page, a no ser que sea un usuario de tipo alumno
 * que no ha respondido la encuesta, en ese caso redirecciona a la vista de encuesta c:**/
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        var username = req.user;
        connection.query("select * from inforganizador.user where Username ='" + username + "'", function (err, rows) {
            if (err) {
                console.log("Error, falló la consulta sql");
            }
            if (rows[0].Tipo_usuario == 0) {
                if (rows[0].Tipo_aprendizaje == 0) {
                    res.redirect('/encuesta');
                }
            }
            else {
                return next();
            }
        })
    }
    else{
        res.redirect('/');
    }

};

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});



app.listen(9000);