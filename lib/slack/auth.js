var express = require('express');
var request = require('request');
var config = require('../../config.json');
var router = express.Router();
var utils = require('../../utils');
var _ = require('lodash');

var User = require('../../db/User');

module.exports.authenticate = function(req, res, next, resCB) {
  request("https://slack.com/oauth/authorize?client_id=" + config.client_id + "&scope=client", function(error, response, body) {
    var code = req.query.code;
    console.log('Response: ' + response);
    console.log('Code: ' + code);
    console.log('Body: ' + body);

    request("https://slack.com/api/oauth.access?client_id=" + config.client_id + "&client_secret=" + config.client_secret + "&code=" + code, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var token = JSON.parse(body).access_token;
        var channels;
        var general;
        request("https://slack.com/api/channels.list?token=" + token, function (error, response, body) {
          channels = JSON.parse(body).channels;

          _.each(channels, function(value) {
            if (value.name === "general") {
              general = value.id;
              return;
            }
          });
          console.log(token);
          request.get("https://slack.com/api/chat.postMessage?token=" + token + "&channel=" + general + "&text=testing 1 2 3&as_user=true");
          res.send(token);
        });
      }
    });
  });
}