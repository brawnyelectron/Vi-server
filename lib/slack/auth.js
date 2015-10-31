var express = require('express');
var router = express.Router();
var config = require('../../config.json');
var utils = require('../../utils');
var passport = require('passport'), SlackStrategy = require('passport-slack').Strategy;

/* Authentication */
passport.use(new SlackStrategy({
  clientID: config.clientId,
  clientSecret: config.clientSecret,
  callbackURL: "http://localhost:3000/authenticate/slack/callback",
  passReqToCallback: true,
}, function(req, accessToken, refreshToken, profile, done) {
  req.session.slack = {};
  req.session.slack.accessToken = accessToken;
  return done(null, false);
}));

/* Configure Routes */
router.get('/slack/start', passport.authenticate('slack'));
router.get('/slack/callback', passport.authenticate('slack', { failureRedirect: '/authenticate/slack/done' }));
router.get('/slack/done', function(req, res, next) {
  res.send(req.session.slack.accessToken);
});

module.exports = router;