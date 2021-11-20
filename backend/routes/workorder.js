const express = require('express');
const router = express.Router();
const mongoDb = require('../mongoDb')
const db = mongoDb.getDb();
const workorder = 'work_orders' //Collection name in MongoDb

/* GET All Work-Orders */
router.get('/', function (req, res) {

  db.collection(workorder)
    .find().toArray((err, results) => {
      if (err) return console.log(err)

      res.send(results)
    });

});

router.post('/', (req, res) => {
  const data = req.body;

  db.collection(workorder)
    .insertOne(data, (err, result) => {
      if (err) return console.log(err)
      res.send('Saved')
    })
});

/* Query Workorder by specific date */
/* These get routes below are for testing, ideally they should be POST route that return data upon query */
router.get('/:date', function (req, res) {

  // const searched_date = req.body.<var-name> 

  const searched_date = '2021-11-20' //Temp for testing

  db.collection(workorder)
    .find({
      created_on: {
        '$regex': searched_date, '$options': 'i'
      }
    }).toArray((err, results) => {
      if (err) return console.log(err)

      res.send(results)
    });

});


router.get('/:range', function (req, res) {

  // const to_date = req.body.<var-name>
  // const from_date = req.body.<var-name>

  const to_date = '2021-11-20' //Temp for testing
  const from_date = '2021-03-03' //Temp for testing

  db.collection(workorder)
    .find({
      "created_on": {
        "$gte": new Date(from_date),
        "$lte": new Date(to_date)
      }
    }).toArray((err, results) => {
      if (err) return console.log(err)

      res.send(results)
    });

});




module.exports = router;

