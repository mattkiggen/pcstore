const router = require('express').Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const prisma = require('../lib/prisma');
const { validateOrder, validateOrderUpdate } = require('../lib/validators');

// Get all orders created by user
router.get(
  '/',
  auth,
  asyncMiddleware(async (req, res) => {
    const orders = await prisma.order.findMany({
      where: {
        userId: req.user.id,
      },
      include: { orderDetails: true },
    });
    res.send(orders);
  })
);

// Create new order
router.post(
  '/',
  auth,
  asyncMiddleware(async (req, res) => {
    const { error } = validateOrder(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // Get total
    // What happens if a product is not in stock or there is only 1 and the client requests 2?
    // Might be a better way to do this...
    const calculateTotalAndDecrementStock = async () => {
      let total = 0;

      for (let item of req.body) {
        const p = await prisma.product.findUnique({
          where: {
            id: item.productId,
          },
        });
        total += item.quantity * p.price;

        await prisma.product.update({
          where: {
            id: p.id,
          },
          data: {
            numberInStock: p.numberInStock - item.quantity,
          },
        });
      }

      return total;
    };

    const total = await calculateTotalAndDecrementStock();

    // Insert new order
    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        total,
        orderDetails: {
          create: req.body,
        },
      },
    });

    res.send(order);
  })
);

// Update order
router.put(
  '/:id',
  auth,
  admin,
  asyncMiddleware(async (req, res) => {
    const { error } = validateOrderUpdate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // Maybe add a check for product with param id first?

    const order = await prisma.order.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        dateFulfilled: new Date(req.body.dateFulfilled),
        status: req.body.status,
      },
    });
    return res.send(order);
  })
);

module.exports = router;
