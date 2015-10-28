var express = require('express');
var router = express.Router();
var utils = require('../utils');
var mongoose = require('mongoose');
var User = require('../db/User.js');

mongoose.connect('mongodb://localhost/vi');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
  console.log('I am opened!')
});

router.post('/addUser', function(req, res) {
  var user = new User({ user_id: req.body.user_id, extension_auths: {} })
  User.findOneAndUpdate({ user_id: req.body.user_id}, user, { upsert: true}, function(err, user) {
    if (err) { console.log('We got an err:', err) };
    console.log('User Added! ', user);
  });
  res.sendStatus(200);
});

module.exports = router;