const util = require('../util');

exports.home = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};

exports.data = (req, res) => {
    // example thread id, change to your liking
    const threadId = 997087047047013;
    util.getScoreHistory(threadId, (err, history) => {
    if (err) {
      return res.send(err);
    }
    util.getPlayerData(history, (err, playerData) => {
      if (err) {
        return res.send(err);
      }
      res.json(playerData);
    });
  });
}