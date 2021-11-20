const { ObjectId } = require('bson');
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

/* These get routes below are for testing, ideally they should be POST route that return data upon query. Db query inside these routes are of use to us */

/* Query Workorder by specific date */

router.get('/date', function (req, res) {

  // const searched_date = req.body.<var-name> 
  const searched_date = '2021-11-20'

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


/* Workorder query by Technician name */

router.get('/technician', function (req, res) {

  // const tech_name= req.body.<var-name>
  const tech_name = 'Shuhao Zhang'

  db.collection(workorder)
    .find({
      technician:
      {
        '$regex': tech_name, '$options': 'i'
      }
    })
    .toArray((err, results) => {
      if (err) return console.log(err)

      res.send(results)
    });

});

/* Workorder query by Work Order Title */

router.get('/title', function (req, res) {

  // const title = req.body.<var-name>
  const title = 'air'

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

});

/* Query Workorder by date range */

router.get('/range', function (req, res) {

  // const to_date = req.body.<var-name>
  // const from_date = req.body.<var-name>
  const to_date = "2021-11-20"
  const from_date = "2021-03-16"

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
});

/* Query to get wo done by specific technician from the given range of dates */

router.get('/technicianAndRange', function (req, res) {

  // const to_date = req.body.<var-name>
  // const from_date = req.body.<var-name>
  // const tech_name = req.body.<var-name>
  const tech_name = "Ujjawal sidhpura"
  const to_date = "2021-11-20"
  const from_date = "2021-03-16"

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
});


/* Functionality to manipulate WO when technician starts and then submits WO. */

/* 1. When technician press 'Start', 'time_started' will be inserted */

router.post('/started', function (req, res) {
  const time_started = req.body.time_started
  const workorder_id = req.body.workorder_id

  db.collection(workorder).updateOne(
    { _id: ObjectId(workorder_id) },

    {
      $set: {
        time_started: time_started
      }
    },

    function (err, result) {
      if (err) throw err
      res.send('Updated')
    }
  )

});

/* 2. When technician press ' Finished, 'time_completed' will be inserted and duration will be calculated and inserted */

router.post('/completed', function (req, res) {
  const time_completed = req.body.time_completed
  const workorder_id = req.body.workorder_id

  db.collection(workorder).updateOne(
    { _id: ObjectId(workorder_id) },

    {
      $set: {
        time_completed: time_completed,
      }
    },

    function (err, result) {
      if (err) throw err
      res.send('Updated')
    }
  )

});


module.exports = router;

