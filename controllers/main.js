const util = require('../util');

exports.home = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};