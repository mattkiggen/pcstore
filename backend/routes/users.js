const router = require('express').Router();
const { validateUser, validateUserUpdateInfo } = require('../lib/validators');
const { hashPassword } = require('../lib/password');
const prisma = require('../lib/prisma');
const { createToken } = require('../lib/jwt');
const auth = require('../middleware/auth');

// Add new user, returns JWT token upon successful insertion
router.post('/', async (req, res) => {
  // Validate data
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if user already registered
  let user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (user) return res.status(400).json('user already registered');

  // Hash password
  user = req.body;
  user.password = await hashPassword(user.password);

  // Create user record
  try {
    user = await prisma.user.create({
      data: user,
    });
  } catch (err) {
    return res.status(500).json(err);
  }

  // Create JWT
  const token = createToken({
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
  });

  res.send({ token });
});

// Update user details
router.put('/', auth, async (req, res) => {
  const { error } = validateUserUpdateInfo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  id = req.user.id;

  try {
    await prisma.user.update({
      where: { id },
      data: req.body,
    });
  } catch (err) {
    return res.status(500).json(err);
  }

  return res.send('Updated user successfully');
});

// Get user details by email
router.get('/', auth, async (req, res) => {
  const { email } = req.user;
  let details;
  try {
    details = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  } catch (err) {
    return res.status(500).json(err);
  }
  if (!details) {
    return res.status(404).json('user not found');
  }

  res.send(details);
});

module.exports = router;
