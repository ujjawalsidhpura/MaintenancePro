const express = require('express');
const router = express.Router();
const mongoDb = require('../mongoDb')
const db = mongoDb.getDb();
const workorder = 'work_orders' //Collection name in MongoDb

/* GET All Inventory */
router.get('/', function (req, res) {

  db.collection(workorder).find().toArray((err, results) => {
    if (err) return console.log(err)

    res.send(results)
  });

});

module.exports = router;

