const util = require('../util');

exports.home = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};

exports.data = (req, res) => {
  const threadId = 997087047047013;
  util.getDataAndSave(threadId, (err, playerData) => {
    if (err) {
      return res.json({
        status: 'error',
        err: JSON.stringify(err),
      });
    }
    res.json({
      status: 'success',
      playerData,
    });
  });
};