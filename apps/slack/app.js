var _ = require('lodash');
var request = require('request');
var config = require('../../config.json');

module.exports.post = function(text, req, res) {
  console.log(text);
  var token = JSON.parse(body).access_token;
  var channels;
  var general;
/*
  request("https://slack.com/api/channels.list?token=" + token, function (error, response, body) {
    channels = JSON.parse(body).channels;

    _.each(channels, function(value) {
      if (value.name === "general") {
        general = value.id;
        return;
      }
    });
    console.log(token);

    request.get("https://slack.com/api/chat.postMessage?token=" + token + "&channel=" + general + "&text=testing 1 2 3&as_user=true", function (error, response, body) {
      console.log(error, body);
      res.send(200);
    });
  });
*/
};
