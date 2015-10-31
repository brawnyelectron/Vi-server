var express   = require('express');
var router    = express.Router();
var mongoose  = require('mongoose');
var bcrypt    = require('bcrypt');
var utils     = require('../utils');

var Developer = require('../db/Developer');

router.post('/', function(req, res) {
  var developer = new Developer({ email: req.body.email, password: bcrypt.hashSync(req.body.password, 8) });
  Developer.update({ email: req.body.email }, developer, { upsert: true }, function(err, dev) {
    if (err) { 
      console.log('Couldn\'t add dev! Error: ', err);
    }
  });
  res.sendStatus(200);
});

module.exports = router;
