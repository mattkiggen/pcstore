const router = require('express').Router();
const auth = require('../middleware/auth');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const prisma = require('../lib/prisma');

router.get('/', async (req, res) => {
  res.send('all orders for a user');
});

// Create new order
router.post(
  '/',
  auth,
  asyncMiddleware(async (req, res) => {
    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        orderDetails: {
          create: req.body,
        },
      },
    });

    res.send(order);
  })
);

module.exports = router;
