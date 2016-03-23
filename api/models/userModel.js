var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', User);