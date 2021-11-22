const { ObjectId } = require('bson');
const express = require('express');
const router = express.Router();
const mongoDb = require('../mongoDb')
const db = mongoDb.getDb();
const workorder = 'work_orders' //Collection name in MongoDb

// GET All Work-Orders 
router.get('/', function (req, res) {

  db.collection(workorder)
    .find()
    .toArray((err, results) => {
      if (err) return console.log(err)

      res.send(results)
    });

});

// POST new Work-Order
router.post('/', (req, res) => {

  const data = req.body;

  db.collection(workorder)
    .insertOne(data, (err, result) => {
      if (err) return console.log(err)
      res.send('Saved')
    })
});


// Query Work-Order by Tech_name/title/both/Range/Both 
router.post('/filter', function (req, res) {

  const tech_name = req.body.tech_name ? req.body.tech_name : null;
  const title = req.body.title ? req.body.title : null;
  const to_date = req.body.to_date ? req.body.to_date : null;
  const from_date = req.body.from_date ? req.body.from_date : null;

  if (tech_name && title && !to_date && !from_date) {

    db.collection(workorder)
      .find({
        '$or': [
          {
            technician:
            {
              '$regex': tech_name, '$options': 'i'
            }
          },
          {
            title: {
              '$regex': title, '$options': 'i'
            }
          }
        ]
      })
      .toArray((err, results) => {
        if (err) return console.log(err)

        res.send(results)
      });

  } else if (tech_name && !title && !to_date && !from_date) {

    db.collection(workorder)
      .find({
        technician: {
          '$regex': tech_name, '$options': 'i'
        }
      })
      .toArray((err, results) => {
        if (err) return console.log(err)

        res.send(results)
      });

  } else if (!tech_name && title && !to_date && !from_date) {

    db.collection(workorder)
      .find({
        title: {
          '$regex': title, '$options': 'i'
        }
      })
      .toArray((err, results) => {
        if (err) return console.log(err)

        res.send(results)
      });

  } else if (!tech_name && !title && to_date && from_date) {

    db.collection(workorder)
      .find({
        created_on: {
          $gte: from_date,
          $lte: to_date
        }
      }).toArray((err, results) => {
        if (err) return console.log(err)

        res.send(results)
      });

  } else if (tech_name && !title && to_date && from_date) {

    db.collection(workorder)
      .find({
        technician: {
          '$regex': tech_name, '$options': 'i'
        },
        created_on: {
          $gte: from_date,
          $lte: to_date
        }
      }).toArray((err, results) => {
        if (err) return console.log(err)

        res.send(results)
      });

  } else if (!tech_name && !title && (to_date || from_date)) {

    const searched_date = to_date ? to_date : from_date;

    db.collection(workorder)
      .find({
        created_on: {
          '$regex': searched_date, '$options': 'i'
        }
      }).toArray((err, results) => {
        if (err) return console.log(err)

        res.send(results)
      });
  }

});

// Functionality to manipulate Work-Order when technician Starts and then submits Work-Order

// 1. When technician press 'Start', 'time_started' will be inserted 
router.post('/started', function (req, res) {
  const workorder_id = req.body.workorder_id

  db.collection(workorder).updateOne(
    { _id: ObjectId(workorder_id) },

    {
      $set: {
        time_started: new Date()
      }
    },

    function (err, result) {
      if (err) throw err
      res.send('Updated')
    }
  )

});

// 2. When technician press ' Finished, 'time_completed' will be inserted and duration will be calculated and inserted 
router.post('/completed', function (req, res) {
  const workorder_id = req.body.workorder_id

  db.collection(workorder).updateOne(
    { _id: ObjectId(workorder_id) },

    [
      {
        "$set": {
          "time_completed": new Date(),
          "duration": {
            "$subtract": [
              "$$NOW",
              "$time_started"
            ]
          }
        }
      }
    ],

    function (err, result) {
      if (err) throw err
      res.send('Updated')
    }
  )

});

router.post('/filter', function (req, res) {

  const tech_name = req.body.tech_name ? req.body.tech_name : null;
  const title = req.body.title ? req.body.title : null;

  if (tech_name && title) {
    db.collection(workorder)
      .find({
        '$or': [
          {
            technician:
            {
              '$regex': tech_name, '$options': 'i'
            }
          },
          {
            title: {
              '$regex': title, '$options': 'i'
            }
          }
        ]
      })
      .toArray((err, results) => {
        if (err) return console.log(err)

        res.send(results)
      });
  } else if (tech_name && !title) {
    db.collection(workorder)
      .find({
        technician: {
          '$regex': tech_name, '$options': 'i'
        }
      })
      .toArray((err, results) => {
        if (err) return console.log(err)

        res.send(results)
      });
  } else if (!tech_name && title) {

    db.collection(workorder)
      .find({
        title: {
          '$regex': title, '$options': 'i'
        }
      })
      .toArray((err, results) => {
        if (err) return console.log(err)

        res.send(results)
      });
  }

});


module.exports = router;

