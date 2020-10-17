const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const { Food } = require('../../models/food');

router.get('/', auth, async (req, res) => {
  try {
    const foods = await Food.find().select('name');
    res.send(foods);
  }
  catch(ex) {
    res.send(ex);
  }
});

module.exports = router;