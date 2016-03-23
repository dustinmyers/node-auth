// Node Modules
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

var userCtrl = require('./api/controller/userCtrl');

// Node Server
var app = express();
var port = 8000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: "supercalifragilisticexpialidocious",
    saveUninitialized: false,
    resave: false
}));

var isAuthenticated = function(req, res, next) {
  if(req.session.user) {
      next();
  } else {
      return res.status(403).send('Please login first')
  }
};

// Endpoints
app.post('/api/login', userCtrl.login);
app.get('/api/coolDataStuffz', isAuthenticated, userCtrl.someFunction);

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