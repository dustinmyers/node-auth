// Node Modules
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var userCtrl = require('./api/controller/userCtrl');
var User = require('./api/models/userModel');

// Node Server
var app = express();
var port = 8000;

/*
  This is working!
  I would suggest throwing logs in a few places, to see what is happening, and in which order.

  Some suggested places to stick logs:
    - in the callback to new LocalStrategy
    - in the serializeUser and deserializeUser callbacks
    - in the isAuthenticated middleware
    - Anywhere else you want to figure out!

  Also note that the order of the middleware declared is important.  If you get it out of order, it can ruin the entire authentication process.
*/


// Define a new way to authenticate (or, Strategy)
passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({email: username}).exec(function (err, user) {
      if (err) return done(err)
      if (!user) return done(null, false)
      if (user.password !== password) return done(null, false)
      return done(null, user)
    })
  }));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.static(__dirname + '/public'));

// Serializing the user object, and putting it in a cookie that's sent to the browser
passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

// Deserializing the cookie that is coming from the browser, allowing you to use it on the server
passport.deserializeUser(function(id, cb) {
  User.findById(id, function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
});

// Initialize Sessions
app.use(session({
    secret: "supercalifragilisticexpialidocious",
    saveUninitialized: false,
    resave: false
}));
// Initialize Passport
app.use(passport.initialize());
// Hand session handling over to Passport
app.use(passport.session());

// Custom middleware
var isAuthenticated = function(req, res, next) {
  if (req.user) {
      next();
  } else {
      return res.status(403).send('Please login first')
  }
};

// Endpoints
app.post('/api/register', userCtrl.register)
app.post('/api/login',
  passport.authenticate('local', { failureRedirect: '/api/failed-login' }), // Use Passport to login on this route
  userCtrl.login // Handler, after Passport authenticates (remember, passport.authenticate is just a middleware)
);
app.get('/api/failed-login', function (req, res) {
  res.json('failed login')
});
app.get('/api/coolDataStuffz',
  isAuthenticated, // Use our custom middleware to make this route 'protected'
  userCtrl.someFunction // Handler, after authentication is verified
);

// MongoDB
var mongoUri = 'mongodb://localhost:27017/node-auth';
mongoose.connect(mongoUri);

// Start Database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
    console.log('connected to db at ' + mongoUri)
});

// Start Server
app.listen(port, function() {
    console.log('I\'m watching you... Always watching: ' + port);
});
