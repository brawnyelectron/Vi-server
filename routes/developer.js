var express   = require('express');
var router    = express.Router();
var mongoose  = require('mongoose');
var bcrypt    = require('bcrypt');
var uuid      = require('node-uuid');
var utils     = require('../utils');

var Developer = require('../db/Developer');

router.post('/', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  // Check if email exists in the database
  Developer.findOne({email: email}, function(err, developer) {

    // Account exists
    if (developer !== null) {
      if (bcrypt.compareSync(password, developer.password)) {
        var guid = uuid.v4();
        Developer.findOneAndUpdate({email: email}, {authToken: guid}, function(err, a) {
          res.status(200).send(guid);
        });
      } else {
        res.status(401).send("Email exists but you typed the wrong password so bad on you!")
      }
    } else {
      var guid = uuid.v4();
      var developer = new Developer({ email: email, password: bcrypt.hashSync(password, 8), authToken: guid });
      developer.save();
      res.status(201).send(guid);
    }
  });
});

module.exports = router;
