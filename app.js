"use strict";

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const http = require('http');

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
app.get('/data', mainCtrl.data);

// Update every hour
setInterval(() => {
  http.request({
    host: '127.0.0.1',
    port: process.env.PORT,
    path: '/data',
  }, (response) => {
    response.on('end', () => {
      // /data does everything for us
      console.log('Data updated.');
    });
  }).end();
}, 1000 * 60 * 60);


app.listen(app.get('port'), () => {
  console.log(`App listening on port ${app.get('port')}`)
});

