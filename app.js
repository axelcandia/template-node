var express = require('express');

var app     = express();
var multer  = require('multer');

var config  = require("./config/config");

var port    = process.env.PORT || config.port;
var passport = require('passport');
const Auth0Strategy = require('passport-auth0')
var flash = require('connect-flash');
var path = require('path');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var now = new Date();

//HTTPS Settings
var fs = require('fs');

var https = require('https');

var options = {
    key: fs.readFileSync('config/env/dev-keys/localhost.pem'),
    cert: fs.readFileSync('config/env/dev-keys/localhost.pem'),
    requestCert: false,
    rejectUnauthorized: false
};
var server = https.createServer(options, app).listen(port, function(){
    console.log("Server started at port: "+port);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/***************Mongodb configuratrion********************/
const mongoose = require('./config/mongoose');
var db 			= mongoose();

//configuration ===============================================================
//mongoose.connect(configDB.url); // connect to our database


//require('./config/passport')(passport); // pass passport for configuration
//set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

//view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
//app.set('view engine', 'ejs'); // set up ejs for templating


//required for passport

app.use(session({
    secret: 'supermegasecretDONOTsharee',
    resave: true,
    saveUninitialized: true
}));

///////////// START OF AUTH0 /////////////////////////////////

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
  config.auth0,
  (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile);
  }
);

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// ...
app.use(passport.initialize());
app.use(passport.session());
///END OF AUTH0///////




app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./config/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


//launch ======================================================================
//app.listen(port);
//console.log('The magic happens on port ' + port);
//catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).render('404', {title: "Sorry, page not found", session: req.sessionbo});
});

app.use(function (req, res, next) {
    res.status(500).render('404', {title: "Sorry, page not found"});
});
exports = module.exports = app;
