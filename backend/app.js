//App setup
require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const debug = require('debug')('backend:server');
const http = require('http');
const port = process.env.PORT || '3000';
const server = http.createServer(app);

//Middleware setup
app.set('port', port);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Mongo Connections
const mongoDb = require('./mongoDb');
mongoDb.connectToServer(function (err) {
  //App goes online once this callback occurs

  //Main Routes
  const workorderRouter = require('./routes/workorder');
  const inventoryRouter = require('./routes/inventory');
  app.use('/workorder', workorderRouter);
  app.use('/inventory', inventoryRouter);

  //Handle 404 
  app.use(function (req, res, next) {
    next(createError(404));
  });

  app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });

})


//Start Server
server.listen(port, () => {
  console.log('App listening at ' + port)
});

module.exports = app;
