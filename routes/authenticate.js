var express = require('express');
var router = express.Router();
var utils = require('../utils');

var Extension = require('../db/Extension');
var Developer = require('../db/Developer');

var passport = require('passport'), SlackStrategy = require('passport-slack').Strategy;

router.get('/:ext', passport.authorize('slack'));

// router.get('/:ext', function(req, res, next) {
//   // var extension = req.body.extension;
//   console.log('Extension name: ', req.params.ext);
//   var extension = req.params.pa;
//   passport.authorize('slack');
//   // utils.runAuthenticationSequence(extension, req, res, next, function(err, token) {
//   //   if (err) {
//   //     console.log('Error in authenticating extension', err);
//   //   }
//   //   res.send(token);
//   // });
// });

module.exports = router;