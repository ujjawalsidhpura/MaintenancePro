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
app.set('port', port);
const server = http.createServer(app);

//Mongo Connections
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;


//Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Mongo Connection credentials
const CONNECTION_URL = process.env.CONNECTION_URL
const DATABASE_NAME = process.env.DATABASE_NAME

//Main Routes
const workorderRouter = require('./routes/workorder');
const inventoryRouter = require('./routes/inventory');

app.use('/workorder', workorderRouter);
app.use('/inventory', inventoryRouter);

//Start Server
server.listen(port, () => {

  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      throw error;
    }

    database = client.db(DATABASE_NAME);
    console.log("Connected to " + DATABASE_NAME);
    console.log('app listening at ' + port)

  });
});

module.exports = app;
