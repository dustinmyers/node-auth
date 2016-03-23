// Node Modules
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

// Node Server
var app = express();
var port = 8000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.static(__dirname + '/public'));

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