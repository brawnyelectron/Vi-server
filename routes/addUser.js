var express = require('express');
var router = express.Router();
var utils = require('../utils');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vi')
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
  console.log('I am opened!')
});

router.post('/addUser', function(req, res) {
  res.sendStatus('Hello!');
});

module.exports = router;
