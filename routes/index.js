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

    var extName = matches[2];
    var cmd = matches[3];
    var txt = matches[4];

    var responseJSON = {}

    if (!utils.getExt(extName)) {
      console.log("Error, " + extName + " not found");
      responseJSON["feedback"] = "Sorry, I couldn't find " + extName;
      res.json(responseJSON);
    } else {
      var ext = require('../lib/' + extName + '/ext.js');
      if (ext[cmd] === undefined) {
        console.log("Error, command " + cmd + " for extension " + extName + " is not available.")
        responseJSON["feedback"] = "I found application " + extName + " but don't get what you mean by " + cmd;
        res.json(responseJSON);
      } else {
        ext[cmd](txt, req, res);
      }
    }
  }
});

module.exports = router;
