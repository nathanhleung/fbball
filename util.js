"use strict";

const fbChat = require('facebook-chat-api');

exports.getScoreHistory = (threadId, cb) => {
    fbChat({
      email: process.env.FB_EMAIL,
      password: process.env.FB_PASSWORD,
    }, (err, api) => {
      if (err) {
        return cb(err);
      }
      api.getThreadInfo(threadId, (err, info) => {
        if (err) {
          return cb(err);
        }
        api.getThreadHistory(threadId, 0, info.messageCount, 0, (err, history) => {
          if (err) {
            return cb(err);
          }
          const scoreHistory = history.actions.filter((msg) => {
            if (msg.action_type === 'ma-type:log-message') {
              const untyped = msg.log_message_data.untypedData;
              if (untyped) {
                if (untyped.game_type === 'basketball') {
                  return true;
                }
              }
            }
            return false;
          }).map((msg) => {
            return {
              timestamp: msg.timestamp,
              sender_name: msg.sender_name,
              sender_fbid: msg.sender_fbid.replace(/\D/g,''), // remove all non-digits
              score: Number(msg.log_message_data.untypedData.score)
            };
          });
          cb(null, scoreHistory);
        });
      });
    });
};

exports.getPlayerData = (scoreHistory, cb) => {
  const playerData = scoreHistory.reduce((prev, curr) => {
    if (
      indexOfKeyVal('name', curr.sender_name, prev) === -1
    ) {
      prev.push({
        name: curr.sender_name,
        fbid: curr.sender_fbid,
        score: curr.score,
        attempts: 1,
      });
    } else {
      let index =
        indexOfKeyVal('name', curr.sender_name, prev);
      prev[index].score += curr.score;
      prev[index].attempts += 1;
    }
    return prev;
  }, []);
  cb(null, playerData);
  
  function indexOfKeyVal(key, value, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return i;
      }
    }
    return -1;
  }
};