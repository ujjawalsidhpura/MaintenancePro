const express = require('express');
const router = express.Router();

const inventory = [
  {
    _id: 1,
    _category: 'Hardware',
    item: 'bolt 2 inch',
    price_item: 1,
    quantity: 100
  },
  {
    _id: 2,
    _category: 'Hardware',
    item: 'bolt 5 inch',
    price_item: 3.5,
    quantity: 50
  },
  {
    _id: 3,
    _category: 'Interior',
    item: 'carpet tiles',
    price_item: 45,
    quantity: 2000
  },
  {
    _id: 4,
    _category: 'Interior',
    item: 'Paint 3L jugs',
    price_item: 60,
    quantity: 15
  },
  {
    _id: 5,
    _category: 'Tools',
    item: 'Landmover john deere 2010',
    price_item: 7000,
    quantity: 1
  }
]

/* GET users listing. */
router.get('/', function (req, res) {
  res.send(inventory);
});

module.exports = router;
