var User = require('../models/userModel');
var mongoose = require('mongoose');

module.exports = {

    login: function(req, res) {
      console.log('LOGGINGIN')
      return res.redirect('/');
        // if (req.session.user) {
        //     delete req.session.user;
        // }
        // User.findOne({email: req.body.email}).exec(function(err, user) {
        //     if(err) {
        //         //handle error
        //     }
        //     if(user && user.password === req.body.password) {
        //         req.session.user(user);
        //         res.status(200).json(user);
        //     }
        //     if(user && user.password !== req.body.password) {
        //         // try again - some cruel rejection message
        //     }
        //     if(!user) {
        //         var newUser = new User({
        //             email: req.body.email,
        //             password: req.body.password
        //         });
        //         newUser.save(function(err, user){
        //             if(err) {
        //                 //handle error
        //             }
        //             else {
        //                 req.session.user(user);
        //                 res.status(200).json(user);
        //             }
        //         })
        //     }
        // })
    },

    register: function (req, res) {
      console.log('registering...')
      User.create({
        email: req.body.email,
        password: req.body.password,
        createdAt: Date.now()
      }, function(e) {
        if (e) return res.status(500).json(e)
        res.json('user created')
      })
    },
    //Just so the example in the server.js doesn't kill the server...
    someFunction: function() {
        return null;
    }

};
