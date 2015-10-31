var _ = require('lodash');
var request = require('request');

module.exports = {
  title: 'Slack',
  iconURL: 'http://viapi.io/luna',
  commands: {
    'in $1 say $2': function(cb, auth, args) {
      var token = auth.token;
      var channel = args[0];
      var text = args[1];

      request('https://slack.com/api/channels.list?token=' + token, function (err, res, body) {
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

        request.get(url, function(err, res, body) {
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
    'tell $1 that $2': function(cb, auth, args) {
      var token = auth.token;
      var user = args[0].toLowerCase();
      var text = args[1];

      getUser()
      .then(getRoom)
      .then(sendMessage)
      .catch(function(feedback) {
        cb('error', feedback);
      });

      function getUser() {
        return new Promise(function(resolve, reject) {
          request('https://slack.com/api/users.list?token=' + token, function(err, res, body) {
            if (err) {
              console.log(err);
              reject('Unable to load users');
              return;
            }

            var data = JSON.parse(body).members;

            for (var i = 0; i < data.length; i++) {
              if (data[i].name === user) {
                resolve(data[i].id);
                return;
              }
            }

            reject('unable to find user ' + user);
          });
        });
      }

      function getRoom(userId) {
        return new Promise(function(resolve, reject) {
          request('https://slack.com/api/im.list?token=' + token, function(err, res, body) {
            if (err) {
              console.log(err);
              reject('Unable to load room list');
              return;
            }

            var data = JSON.parse(body).ims;

            for (var i = 0; i < data.length; i++) {
              if (data[i].user === userId) {
                resolve(data[i].id);
                return;
              }
            }

            reject('Unable to find chat room');
          });
        });
      }

      function sendMessage(roomId) {
        var url = 'https://slack.com/api/chat.postMessage?token='+ token
          + '&channel=' + roomId
          + '&text=' + text + '&as_user=true&link_names=1';

        request.get(url, function(err, res, body) {
          if (err) {
            cb('error', 'I wasn\'t able to send the message. Frowny face');
            return;
          }
          else {
            cb(null, 'Your message was sent.');
          }
        });
      }

    }
  },
}