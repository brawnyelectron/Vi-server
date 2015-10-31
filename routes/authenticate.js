var express = require('express');
var router = express.Router();
var utils = require('../utils');
var config = require('../config.json');

router.get('/:extension', function(req, res, next) {
  utils.runAuthenticationSequence(req.params.extension, function() {
    res.redirect('/authenticate/' + req.params.extension + '/start');
  });
});

/** This is where you require all the apps that need to be used. They will eventually send back a JSON with the token information for the client **/

/* Need to use .use because exporting router in lib */
router.use('/', require('../lib/slack/auth.js'));

module.exports = router;