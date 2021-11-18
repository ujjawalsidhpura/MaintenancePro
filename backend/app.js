require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const PORT = process.env.PORT

const workorderRouter = require('./routes/workorder');
const inventoryRouter = require('./routes/inventory');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/workorder', workorderRouter);
app.use('/inventory', inventoryRouter);

module.exports = app;
