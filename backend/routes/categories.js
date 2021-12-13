const router = require('express').Router();

router.get('/', async (req, res) => {
  res.send('A list of all categories');
});

module.exports = router;
