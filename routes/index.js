var express = require('express');
var router = express.Router();
var utils = require('../utils');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(200);
});

router.post('/command', function(req, res) {
  if (!Object.keys(req.body).length) {
    res.send(400);
  } else {
    var transcript = req.body.transcript;
    var auth = req.body.auth;
    console.log('auth =', auth);

    utils.runCommand(transcript, auth, function(err, feedback) {
      if (err) {
        console.log(err);
        res.send({feedback: feedback});
      }
      else {
        res.send({feedback: feedback});
      }

    });
  }
});

module.exports = router;
