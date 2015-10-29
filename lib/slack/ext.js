var _ = require('lodash');
var request = require('request');

module.exports = {
  title: 'Slack',
  iconURL: 'http://viapi.io/luna',
  commands: {
    'in $1 say $2': function(cb, args) {
      var token = '';
      var channel = args[0];
      var text = args[1];

      request('https://slack.com/api/channels.list?token=' + token, function (err, response, body) {
        channels = JSON.parse(body).channels;
        var roomId;

        _.each(channels, function(value) {
          if (value.name.toLowerCase() === channel)
            roomId = value.id;
        });

        if (!roomId) {
          cb('error', 'Sir, that isn\'t a valid room name');
          return;
        }

        var url = 'https://slack.com/api/chat.postMessage?token='+ token
          + '&channel=' + roomId
          + '&text=' + text + '&as_user=true&link_names=1';

        request.get(url, function(err, response, body) {
          if (err) {
            cb('error', 'I wasn\'t able to send the message. Frowny face');
            return;
          }
          else {
            cb(null, 'Your message was sent.');
          }
        });
      });
    },
    'test': function() {
      console.log('TESTING FUNCTION');
    }
  },
}