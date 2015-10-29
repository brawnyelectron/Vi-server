var express = require('express');
var request = require('request');
var config = require('../config.json');
var router = express.Router();
var utils = require('../utils');
var _ = require('lodash');

/* GET home page. */
router.get('/uri', function(req, res, next) {
  var code = req.query.code;
  console.log('Code from uri route', code);
  res.send(200);
});

module.exports = router;
