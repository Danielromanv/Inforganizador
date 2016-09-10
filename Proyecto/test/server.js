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

app.get('/font-awesome.min.css', function (req, res) {
    res.sendfile(__dirname + '/Views/font-awesome.min.css');
});

app.get('/bootstrap.min.css',function (req, res) {
    res.sendfile(__dirname + '/Views/bootstrap.min.css');
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
});

app.post('/encuesta',function (req,res) {
    var username = req.user;
    var EA = req.body.EA1 + req.body.EA2 + req.body.EA3 + req.body.EA4 + req.body.EA5 + req.body.EA6 + req.body.EA7 + req.body.EA8 + req.body.EA9 + req.body.EA10 + req.body.EA11 + req.body.EA12;
    var EC = req.body.EC1 + req.body.EC2+ req.body.EC3+req.body.EC4+req.body.EC5+req.body.EC6+req.body.EC7+req.body.EC8+req.body.EC9+req.body.EC10+req.body.EC11+req.body.EC12;
    var OR = req.body.OR1 + req.body.OR2+ req.body.OR3+req.body.OR4+req.body.OR5+req.body.OR6+req.body.OR7+req.body.OR8+req.body.OR9+req.body.OR10+req.body.OR11+req.body.OR12;
    var CA = req.body.CA1 + req.body.CA2 + req.body.CA3+req.body.CA4+req.body.CA5+req.body.CA6+req.body.CA7+req.body.CA8+req.body.CA9+req.body.CA10+req.body.CA11+req.body.CA12;
    /**Enfoque divergente = 1**/
    if(CA - EC >= 3 && EA - OR <= 5){
        console.log("UPDATE inforganizador.user SET Tipo_aprendizaje = 1 WHERE Username ='"+username+"'");
        connection.query("UPDATE inforganizador.user SET Tipo_aprendizaje = 1 WHERE Username ='"+ username +"'",function (rows,err) {
            if(err){
                console.log("Error al asignar perfil de aprendizaje 1");
            }

                res.redirect('/demo');

        })
    }
    /**Enfoque Adaptador = 2**/
    else if(CA - EC <= 3 && EA - OR >6){
        console.log("UPDATE inforganizador.user SET Tipo_aprendizaje = 1 WHERE Username ='"+ username +"'");
        connection.query("UPDATE inforganizador.user SET Tipo_aprendizaje = 2 WHERE Username ='"+ username +"'",function (rows,err) {
            if(err){
                console.log("Error al asignar perfil de aprendizaje 2");
            }
                res.redirect('/demo');

        })
    }
    /**Enfoque Convergente = 3**/
    else if(CA - EC > 4 && EA - OR >6){
        console.log("UPDATE inforganizador.user SET Tipo_aprendizaje = 1 WHERE Username ='"+username+"'");
        connection.query("UPDATE inforganizador.user SET Tipo_aprendizaje = 3 WHERE Username ='"+ username +"'",function (rows,err) {
            if(err){
                console.log(err);
                console.log("Error al asignar perfil de aprendizaje 3");
            }
            res.redirect('/demo');
        })
    }
    /**Enfoque Asimilador = 4**/
    else {
        console.log("UPDATE inforganizador.user SET Tipo_aprendizaje = 1 WHERE Username ='"+ username +"'");
        connection.query("UPDATE inforganizador.user SET Tipo_aprendizaje = 4 WHERE Username ='" + username + "'", function (rows, err) {
            if (err) {
                console.log("Error al asignar perfil de aprendizaje 4");
            }

                res.redirect('/demo');

        })
    }
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
