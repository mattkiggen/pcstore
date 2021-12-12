const router = require('express').Router();

router.get('/', async (req, res) => {
  res.send('all orders for a user');
});

module.exports = router;
