var _ = require('lodash');
var request = require('request');
var config = require('../../config.json');

module.exports.post = function(text, req, res) {
  var token = "";
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

    request.get("https://slack.com/api/chat.postMessage?token=" + token + "&channel=" + general + "&text=" + text + "&as_user=true&link_names=1", function (error, response, body) {
      res.send(200);
    });
  });
};
