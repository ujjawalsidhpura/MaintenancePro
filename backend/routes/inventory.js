const express = require('express');
const router = express.Router();
const mongoDb = require('../mongoDb')
const db = mongoDb.getDb();
const inventory = 'Inventory' // Collection name in MongoDb

/* GET All work orders */
router.get('/', function (req, res) {

  db.collection(inventory).find().toArray((err, results) => {
    if (err) return console.log(err)

    res.send(results)
  });

});

module.exports = router;


