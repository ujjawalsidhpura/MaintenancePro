const express = require('express');
const router = express.Router();

const workorders = [
  {
    _id: '1',
    email: 'abc@abc.com',
    name: 'abc',
    description: 'test workorder',
    created_on: Date.now(),
    time_started: null,
    time_completed: null,
    duration: null
  },
  {
    _id: '2',
    email: 'cde@abc.com',
    name: 'cde',
    description: 'test workorder 2',
    created_on: Date.now(),
    time_started: null,
    time_completed: null,
    duration: null
  }
]


/* GET home page. */
router.get('/', function (req, res) {
  res.send(workorders)
});

module.exports = router;
