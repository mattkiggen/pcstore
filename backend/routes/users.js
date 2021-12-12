const router = require('express').Router();
const { createUser, validateUser } = require('../models/user');
const { hashPassword } = require('../lib/password');

// Add new user
router.post('/', async (req, res) => {
  // Validate data
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Hash password
  const user = req.body;
  user.password = await hashPassword(user.password);

  // Create user record
  const data = await createUser(req.body);
  if (data.error) {
    return res
      .status(400)
      .json({ message: 'Error creating new user', error: data.error });
  }
  res.status(200).json(data.user);
});

module.exports = router;
