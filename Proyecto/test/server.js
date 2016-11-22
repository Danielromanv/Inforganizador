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

app.get('/about', function (req, res) {
    res.sendfile(__dirname + '/Views/about.html');
});

app.get('/contact', function (req, res) {
    res.sendfile(__dirname + '/Views/contacto.html');
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

app.get('/contact.js',function (req, res) {
    res.sendfile(__dirname + '/app/controllers/contact.js');
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
    connection.query("UPDATE inforganizador.user SET Tipo_aprendizaje = "+ resultado +" WHERE Username ='"+ username +"'",function (err,rows) {
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
  console.log(req.user);
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
  var newUsuario = new usuarioCRUD(req.body.usuario, req.body.password, req.body.nombre, req.body.apellido, req.body.email, req.body.tipo_usuario);
  newUsuario.insert(res);
});

app.get('/crearCurso', function(req, res){
  res.sendfile(__dirname + '/Views/crearCurso.html');
  app.use(express.static(__dirname + '/Views/css'));
  app.use(express.static(__dirname + '/app'));
  app.use(express.static(__dirname + '/config'));
});

app.post('/insertCurso', function(req, res){
  var cursoCRUD = require('./app/models/curso');
  var newCurso = new cursoCRUD('nope', req.body.nombreCurso);
  newCurso.insert(res);
})

app.get('/crearUnidad', function(req, res){
  res.sendfile(__dirname + '/Views/crearUnidad.html');
  app.use(express.static(__dirname + '/Views/css'));
  app.use(express.static(__dirname + '/app'));
  app.use(express.static(__dirname + '/config'));
});

app.post('/insertUnidad', function(req, res){
  var unidadCRUD = require('./app/models/unidad');
  var newUnidad = new unidadCRUD(" ", req.body.idCurso, req.body.nombreUnidad);
  newUnidad.insert(res);
})

app.get('/eliminarUsuario', function(req, res){
  res.sendfile(__dirname + '/Views/eliminarUsuario.html');
  app.use(express.static(__dirname + '/Views/css'));
  app.use(express.static(__dirname + '/app'));
  app.use(express.static(__dirname + '/config'));
});

app.get('/modificarUsuario', function(req, res){
  res.sendfile(__dirname + '/Views/modificarUsuario.html');
  app.use(express.static(__dirname + '/Views/css'));
  app.use(express.static(__dirname + '/app'));
  app.use(express.static(__dirname + '/config'));
});

app.get('/eliminarCursoUnidad', function(req, res){
  res.sendfile(__dirname + '/Views/eliminarCursoUnidad.html');
  app.use(express.static(__dirname + '/Views/css'));
  app.use(express.static(__dirname + '/app'));
  app.use(express.static(__dirname + '/config'));
});

app.get('/modificarCursoUnidad', function(req, res){
  res.sendfile(__dirname + '/Views/modificarCursoUnidad.html');
  app.use(express.static(__dirname + '/Views/css'));
  app.use(express.static(__dirname + '/app'));
  app.use(express.static(__dirname + '/config'));
});



app.post('/deleteUser', function(req, res){
  var usuarioCRUD = require('./app/models/usuario');
  var newUsuario = new usuarioCRUD(req.body.usuario," ", " ", " ", " ", " ");
  newUsuario.delete(res);
});

app.post('/deleteCurso', function(req, res){
  var cursoCRUD = require('./app/models/curso');
  var newCurso = new cursoCRUD(req.body.idCurso, " ");
  newCurso.delete(res);
});

app.post('/deleteUnidad', function(req, res){
  var unidadCRUD = require('./app/models/unidad');
  var newUnidad = new unidadCRUD(req.body.idUnidad, req.body.idCurso," ");
  newUnidad.delete(res);
});

app.get('/obtenerCursos', function(req, res){
  var Query = "SELECT * from inforganizador.curso;";
  connection.query(Query, function(err, rows){
    if(err){
        console.log(err);
        return res.status(400).send("Error al buscar los cursos");
    }
    else{
      return res.status(200).send(rows);
    }
  })
});

app.post('/obtenerUnidad', function(req, res){
  var Query = "SELECT * from inforganizador.unidad WHERE CursoID_curso = ?";
  connection.query(Query,[req.body.idCurso], function(err, rows){
    if(err){
      res.status(400).send("Error al buscar las unidades");
    }
    else{
      return res.status(200).send(rows);
    }
  })
});

app.get('/obtenerUsuarios', function(req, res){
  var Query = "SELECT Username, Nombre, Apellido, Email, Tipo_aprendizaje, Tipo_usuario FROM inforganizador.user";
  connection.query(Query, function(err, rows){
    if(err){
      return res.status(400).send("Error al buscar los usuarios");
    }
    else{
      return res.status(200).send(rows);
    }
  })
});

app.post('/obtenerUsuariosEsp', function(req, res){
  var Query = "SELECT * FROM inforganizador.user WHERE Username = ?;";
  connection.query(Query,[req.body.usuario], function(err, rows){
    if(err){
      console.log(err);
      return res.status(400).send("Error al buscar el usuario");
    }
    else{
      console.log(rows);
      return res.status(200).send(rows);
    }
  })
});

app.post('/ObtenerCursoEsp', function(req, res){
  var Query = "SELECT * FROM inforganizador.curso WHERE ID_curso = ?";
  connection.query(Query,[req.body.idCurso], function(err, rows){
    if(err){
      console.log(err);
      return res.status(400).send("Error al buscar el Curso");
    }
    else{
      return res.status(200).send(rows);
    }
  })
});

app.post('/ObtenerUnidadEsp', function(req, res){
  var Query = "SELECT * FROM inforganizador.unidad WHERE ID_unidad = ? AND CursoID_curso = ?";
  connection.query(Query,[req.body.idUnidad, req.body.idCurso], function(err, rows){
    if(err){
      console.log(err);
      return res.status(400).send("Error al buscar la unidad");
    }
    else{
      return res.status(200).send(rows);
    }
  })
});

app.post('/updateUsuarios', function(req, res){
  var usuarioCRUD = require('./app/models/usuario');
  var updateUsuario = new usuarioCRUD(req.body.usuario, " ", req.body.nombre, req.body.apellido, req.body.email, req.body.tipo_usuario);
  updateUsuario.update(res, req.body.exusuario);
});

app.post('/updateCurso', function(req, res){
  var cursoCRUD = require('./app/models/curso');
  var updateCurso = new cursoCRUD(req.body.idCurso, req.body.nombreCurso);
  updateCurso.update(res);
});

app.post('/updateUnidad', function(req, res){
  var unidadCRUD = require('./app/models/unidad');
  console.log(req.body);
  var updateUnidad = new unidadCRUD(req.body.idUnidad, req.body.idCurso, req.body.nombreUnidad);
  updateUnidad.update(res);
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

/**
function isLoggedInProfiles(req, res, next) {
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
            else if (rows[0].Tipo_usuario == 1){
              res.redirect('/panelAdmin');
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
**/

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


app.listen(9000);
