var express = require('express');
var router = express.Router();
var utils = require('../utils');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendStatus(200);
});

router.post('/', function(req, res) {
  if (!Object.keys(req.body).length) res.send(400);
  else {
    var transcript = req.body.transcript;
    console.log(transcript);
    var lower = transcript.toLowerCase();
    var matches = lower.match(/(hey|yo) (\w+) (\w+) (.*)/);

    var appName = matches[2];
    var cmd = matches[3];
    var txt = matches[4];

    if (!utils.getApp(appName)) {
      res.send("Error, " + appName + " was not found!");
    } else {
      var app = require('../apps/' + appName + '/app.js');
      if (app[cmd] === undefined) {
        res.send("Error, command " + cmd + " for plugin " + appName + " is not available.");
      } else {
        app[cmd](txt, req, res);
      }
    }
  }
});

module.exports = router;
