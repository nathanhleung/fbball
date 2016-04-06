"use strict";

const express = require('express');
const morgan = require('morgan');
const path = require('path');

const mainCtrl = require('./controllers/main');
const util = require('./util');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1y',
}));

app.get('/', mainCtrl.home);
// API for refreshing the data
app.get('/data', (req, res) => {
  const threadId = 997087047047013;
  util.getDataAndSave(threadId, (err) => {
    if (err) {
      return res.send(err);
    }
    res.send('Data saved')
  });
})

// Update every hour
setInterval(() => {
  const threadId = 997087047047013;
  util.getDataAndSave(threadId, (err) => {
    if (err) {
      console.log(err);
    }
  });
}, 1000 * 60 * 60);


app.listen(app.get('port'), () => {
  console.log(`App listening on port ${app.get('port')}`)
});

