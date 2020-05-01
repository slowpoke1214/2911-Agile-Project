var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;
const DB_URI = "mongodb://localhost:27017/technolotdb";
let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(DB_URI, options)

var app = express();
var cors = require('cors');
app.use(cors());
app.use( function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({
    secret: 'bqlykqmnraiusecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    },
    store: new (require('express-sessions'))({
        storage: 'mongodb',
        instance: mongoose,
        host: 'localhost',
        port: 27017,
        db: 'technolotdb'
    })
}));

app.use(passport.initialize());
app.use(passport.session());
const User = require('./Models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

require('./router')(app);
app.set('port', 1337);
app.use(express.static(path.join(__dirname, '../html_ui')));

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;

