const { ObjectId } = require('bson');
const express = require('express');
const router = express.Router();
const mongoDb = require('../mongoDb')
const db = mongoDb.getDb();
const workorder = 'work_orders' //Collection name in MongoDb

// GET All Work-Orders 
router.get('/', function (req, res) {

  const today = new Date().toISOString().split('T')[0]
  console.log(today);

  db.collection(workorder)
    .find({
      created_on: {
        '$regex': today, '$options': 'i'
      }
    })
    .toArray((err, results) => {
      if (err) return console.log(err)

      res.send(results)
    });

});

module.exports = router;