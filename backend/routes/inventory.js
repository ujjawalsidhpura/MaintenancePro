const express = require('express');
const router = express.Router();
const mongoDb = require('../mongoDb')
const db = mongoDb.getDb();
const inventory = 'Inventory' // Collection name in MongoDb

/* GET All Inventory */
router.get('/', function (req, res) {

  db.collection(inventory)
    .find().toArray((err, results) => {
      if (err) return console.log(err)

      res.send(results)
    });

});

router.post('/', (req, res) => {
  const data = req.body;

  db.collection(inventory)
    .insertOne(data, (err, result) => {
      if (err) return console.log(err)
      res.send('Saved')
    })
});

/* Get specific category of inventory products */

router.get('/category', function (req, res) {

  // const category = req.body.category;
  const category = 'Tools'

  db.collection(inventory)
    .find({ _category: category }).toArray((err, results) => {
      if (err) return console.log(err)
      res.send(results)
    });

});

/* Get products by typing name in search bar */
/* Finds all matching products that contain that string */

router.get('/search', function (req, res) {

  // const item_name = req.body.item_name;
  const item_name = 'bolt'

  db.collection(inventory).find({
    item: {
      '$regex': item_name, '$options': 'i'
    }
  })
    .toArray((err, results) => {
      if (err) return console.log(err)

      res.send(results)
    });

});

module.exports = router;


