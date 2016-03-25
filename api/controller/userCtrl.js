var User = require('../models/userModel');
var mongoose = require('mongoose');

module.exports = {

    login: function(req, res) {
      return res.json(req.user);
    },

    register: function (req, res) {
      User.create({
        email: req.body.email,
        password: req.body.password,
        createdAt: Date.now()
      }, function(e) {
        if (e) return res.status(500).json(e)
        res.json('user created')
      })
    },

    someFunction: function(req, res) {
        return res.json({secret: 'supercalifragilisticexpialidocious'});
    }

};
