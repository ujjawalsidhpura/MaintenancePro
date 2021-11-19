//Mongo Connection credentials
const CONNECTION_URL = process.env.CONNECTION_URL
const DATABASE_NAME = process.env.DATABASE_NAME

const MongoClient = require('mongodb').MongoClient;
let _db;

module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect(CONNECTION_URL, function (err, client) {
      _db = client.db(DATABASE_NAME);
      return callback(err);
    });
  },
  getDb: function () {
    return _db;
  }
};