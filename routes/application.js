var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var utils = require('../utils');
var fs = require('fs');

var App = require('../db/App');
var Developer = require('../db/Developer');

router.post('/', function(req, res) {
  req.accepts('application/zip');
  Developer.findOne({ username: "pawTestUser" }, function(err, dev) {
    if (err) {
      console.log('No dev found! Or error: ', err);
    } else {
      utils.addExtension(req.body, "demo", function() {
        res.sendStatus(200);
      });
      var app = new App({ developerId: "testIde" })
      app.save(function(err) {
        if (err) { 
          console.log('Didn\'t save app to app collection')
        };
        console.log('App saved!');
      });
    }
  });
});

module.exports = router;