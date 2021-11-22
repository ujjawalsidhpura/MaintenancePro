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

//POST new Inventory Item
router.post('/', (req, res) => {
  const data = req.body;

  db.collection(inventory)
    .insertOne(data, (err, result) => {
      if (err) return console.log(err)
      res.send('Saved')
    })
});

//Filter Inventory by Category/Name/Both

router.post('/filter', function (req, res) {

  const item_name = req.body.item_name ? req.body.item_name : null;
  const category = req.body.category ? req.body.category : null;

  if (category && !item_name) {

    db.collection(inventory)
      .find({ _category: category })
      .toArray((err, results) => {
        if (err) return console.log(err)
        res.send(results)
      });

  } else if (!category && item_name) {

    db.collection(inventory)
      .find({
        item: {
          '$regex': item_name, '$options': 'i'
        }
      })
      .toArray((err, results) => {
        if (err) return console.log(err)

        res.send(results)
      });

  } else if (category && item_name) {

    db.collection(inventory)
      .find({
        '$and': [
          {
            item:
            {
              '$regex': item_name, '$options': 'i'
            }
          },
          {
            _category: category
          }
        ]
      })
      .toArray((err, results) => {
        if (err) return console.log(err)

        res.send(results)
      });

  }

});



module.exports = router;


