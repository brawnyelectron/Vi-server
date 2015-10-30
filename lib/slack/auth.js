var express = require('express');
var request = require('request');
var config = require('../../config.json');
var router = express.Router();
var utils = require('../../utils');
var _ = require('lodash');
var passport = require('passport'), SlackStrategy = require('passport-slack').Strategy;

var User = require('../../db/User');

module.exports.authenticate = function(req, res, next, resCB) {
  passport.use(new SlackStrategy({
    clientID: "12621704533.13244851507",
    clientSecret: "70ea3838f1b9d628a57ac5675e1f64bc"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('Access token: ', accessToken);
    console.log('Refresh token: ', refreshToken);
    console.log('Profile: ', profile);
    resCB(null, token);
  }));
}