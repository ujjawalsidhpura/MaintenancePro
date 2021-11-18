const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
  res.send({ "inventory": "1" });
});

module.exports = router;
