const router = require('express').Router();
const { validateUser } = require('../lib/validators');
const { hashPassword } = require('../lib/password');
const prisma = require('../lib/prisma');

// Add new user
router.post('/', async (req, res) => {
  // Validate data
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Hash password
  let user = req.body;
  user.password = await hashPassword(user.password);

  // Create user record
  try {
    user = await prisma.user.create(user);
  } catch (err) {
    return res.status(500).json(err);
  }

  res.send(user);
});

module.exports = router;
