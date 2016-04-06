"use strict";

const express = require('express');
const morgan = require('morgan');
const path = require('path');

const mainCtrl = require('./controllers/main');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1y',
}));

app.get('/', mainCtrl.home);
app.get('/data', mainCtrl.data);

app.listen(app.get('port'), () => {
  console.log(`App listening on port ${app.get('port')}`)
})

