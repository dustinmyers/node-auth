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

// Define a new way to authenticate (or, Strategy)
passport.use(new LocalStrategy(function (username, password, done) {
    console.log(username, password)
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

passport.serializeUser(function(user, cb) {
  console.log('SERIALIZING')
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  console.log('DESERIALIZING')
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

// app.use(function (req, res, next) {
//   console.log(req.user)
//   console.log(req.session)
//   next()
// })

// var isAuthenticated = function(req, res, next) {
//   if(req.session.user) {
//       next();
//   } else {
//       return res.status(403).send('Please login first')
//   }
// };

// Endpoints
app.post('/api/register', userCtrl.register)
app.post('/api/login', passport.authenticate('local', { failureRedirect: '/api/failed-login' }), userCtrl.login);
app.get('/api/failed-login', function (req, res) {
  console.log("FAILED LOGIN")
  res.json('failed login')
})
// app.get('/api/coolDataStuffz', isAuthenticated, userCtrl.someFunction);

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
