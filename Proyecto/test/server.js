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
var conexionDB = require("./config/database.js");


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

app.get('/app.js',function(req,res) {
    res.sendfile(__dirname + '/app/app.js');
});

app.get('/app/controllers', function (req, res) {
    res.sendfile(__dirname + '/app/controllers');
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/Views/index.html');
});

app.get('/font-awesome.min.css', function (req, res) {
    res.sendfile(__dirname + '/Views/font-awesome.min.css');
});

app.get('/bootstrap.min.css',function (req, res) {
    res.sendfile(__dirname + '/Views/bootstrap.min.css');
});

app.get('/MainController.js',function (req, res) {
    res.sendfile(__dirname + '/app/controllers/MainController.js');
});

app.get('/demo', isLoggedIn, function (req, res) {
    res.sendfile(__dirname + '/Views/demo.html');
    app.use(express.static(__dirname + '/Views/css'));
    app.use(express.static(__dirname + '/app'));
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
    app.use(express.static(__dirname + '/app'));
});

app.post('/encuesta',function (req,res) {
    var username = req.user;
    var resultado = req.body.result;
    connection.query("UPDATE inforganizador.user SET Tipo_aprendizaje = "+ resultado +" WHERE Username ='"+ username +"'",function (rows,err) {
        if(err){
            console.log("Error al asignar perfil de aprendizaje");
        }
        else{
        res.redirect('/demo');
        }
        })
    }
);

app.get('/panelAdmin', function(req, res){
  res.sendfile(__dirname + '/Views/adminPanel.html');
  app.use(express.static(__dirname + '/Views/css'));
  app.use(express.static(__dirname + '/app'));
  app.use(express.static(__dirname + '/config'));
});

app.get('/crearUsuario', function(req, res){
  res.sendfile(__dirname + '/Views/crearUsuario.html');
  app.use(express.static(__dirname + '/Views/css'));
  app.use(express.static(__dirname + '/app'));
  app.use(express.static(__dirname + '/config'));
});


app.post('/insertUser', function(req, res){
  var usuarioCRUD = require('./app/models/usuario');
  console.log(req.body.usuario);

  var newUsuario = new usuarioCRUD(req.body.usuario, req.body.password, req.body.nombre, req.body.apellido, req.body.email, req.body.tipo_usuario);
  var resultado = newUsuario.insert()
  console.log(resultado);
  if(resultado == false){
    console.log("no la hice");
    return res.status(400).send("Error al crear un nuevo usuario, intenta más tarde");
  }
  else if(resultado == true){
    console.log("LA HICE");
    return res.status(200).send("Usuario ingresado con exito");
  }
});

app.get('/crearCurso', function(req, res){
  res.sendfile(__dirname + '/Views/crearCurso.html');
  app.use(express.static(__dirname + '/Views/css'));
  app.use(express.static(__dirname + '/app'));
  app.use(express.static(__dirname + '/config'));
});

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
                else{
                    return next();
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
