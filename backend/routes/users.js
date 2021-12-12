const router = require('express').Router();
const { createUser } = require('../models/user');

router.get('/', (req, res) => {
  res.send('New user');
});

router.post('/', async (req, res) => {
  const user = await createUser(req.body);
  res.send(user);
});

module.exports = router;
