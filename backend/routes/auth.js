const { isValidPassword } = require('../lib/password');
const prisma = require('../lib/prisma');
const { validateUserAuth } = require('../lib/validators');
const { createToken } = require('../lib/jwt');
const asyncMiddleware = require('../middleware/asyncMiddleware');

const router = require('express').Router();

router.post(
  '/',
  asyncMiddleware(async (req, res) => {
    const { error } = validateUserAuth(req.body);
    if (error) return res.status(400).json(error);

    // Check for existing user from email
    let user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    // 401 because we don't want the client to know
    // if we have a user with the given email or not
    if (!user) return res.status(401).json('Incorrect email or password');

    // Check if password matches hashed password
    const valid = await isValidPassword(req.body.password, user.password);
    if (!valid) return res.status(401).json('Incorrect email or password');

    // Return a json web token if details are correct
    const token = createToken({
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    res.send({ token });
  })
);

module.exports = router;
