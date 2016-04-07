const util = require('../util');

exports.home = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};

exports.data = (req, res) => {
  const threadId = 997087047047013;
  util.getDataAndSave(threadId, (err) => {
    if (err) {
      return res.send(err);
    }
    res.send('Data saved')
  });
};