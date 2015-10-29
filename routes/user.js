var express = require('express');
var router = express.Router();
var User = require('../db/User');
var Extension = require('../db/Extension');

router.get('/', function(req, res) {
  User.findOne({ userId: req.body.userId }, function(err, user) {
    if (err) {
      console.log('Error in finding a User! ' + err);
    } else {
      Extension.find({ name: { $in: user.extensions }}, function(err, extensions) {
        if (err) {
          console.log('Error in finding ');
        } else {
          res.send(extensions);
        }
      });
    }
  });
});

router.post('/', function(req, res) {
  var user = new User({ userId: req.body.userId, extensions: [], extensionAuths: {} });
  User.findOneAndUpdate({ userId: req.body.userId }, user, { upsert: true }, function(err, insertedUser) {
    if (err) { 
      console.log('We got an err:', err);
    }
  });
  res.sendStatus(200);
});

module.exports = router;