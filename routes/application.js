var express = require('express')
var router = express.Router();
var mongoose = require('mongoose');
var utils = require('../utils');
var App = require('../db/App');
var Developer = require('../db/Developer');

router.post('/publish', function(req, res) {
  Developer.findOne({ username: req.body.username }, function(err, dev) {
    if (err) {
      console.log('No dev found! Or error: ', err);
    } else {
      // utils.addExtension(req.body.extension, req.body.appName);
      var app = new App({ developerId: dev._id })
      app.save(function(err) {
        if (err) { console.log('Didn\'t save app to app collection')};
        console.log('App saved!');
      });
    }
  });
  res.sendStatus(200);
});

module.exports = router;