/**
 * Created by Felipe on 22-08-2016.
 */
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



app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms


//Weás pal passport :(
app.use(session({ secret: 'somushsecretmen'}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./config/passport')(passport);


app.get('/', function (req, res) {
    res.sendfile(__dirname + '/Views/index.html');
})

app.get('/login', function (req,res) {
    res.sendfile(__dirname + '/Views/login.html', {message: req.flash('loginMessage')});
})

app.post('/login', passport.authenticate('local-login',{
    successRedirect: '/',
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

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};


app.listen(9000);
console.log("No enserio no quiero");