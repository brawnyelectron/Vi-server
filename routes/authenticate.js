var express = require('express');
var router = express.Router();
var utils = require('../utils');

var App = require('../db/App');
var Developer = require('../db/Developer');

router.get('/:appToAuth', function(req, res, next) {
  var app = req.params.appToAuth;
  utils.runAuthenticationSequence(app, req, res, next, function(err) {
    if (err) {
      console.log('Error in authenticating ', err);
    }
    res.send(200);
  });
});

module.exports = router;