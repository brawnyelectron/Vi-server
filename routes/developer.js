var express = require('express');
var router = express.Router();
var utils = require('../utils');
var mongoose = require('mongoose');

var Developer = require('../db/Developer');

router.post('/', function(req, res) {
  var developer = new Developer({ username: req.body.username, password: req.body.password });
  Developer.update({ username: req.body.username }, developer, { upsert: true }, function(err, dev) {
    if (err) { 
      console.log('Couldn\'t add dev! Error: ', err);
    }
  });
  res.sendStatus(200);
});

module.exports = router;