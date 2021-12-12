const router = require('express').Router();

router.get('/', async (req, res) => {
  res.send('all orders for a user');
});

// Create new order
router.post('/', async (req, res) => {
  res.send('New order created...');
});

module.exports = router;
