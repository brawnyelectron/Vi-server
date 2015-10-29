var express = require('express');
var router = express.Router();
var User = require('../db/User');

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