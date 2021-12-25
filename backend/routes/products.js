const router = require('express').Router();
const prisma = require('../lib/prisma');
const { validateProduct, validateProductUpdate } = require('../lib/validators');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/asyncMiddleware');

// Get all products
router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    let products = await prisma.product.findMany();
    res.send(products);
  })
);

// Get product by ID
router.get(
  '/:id',
  asyncMiddleware(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json('Incorrect id');

    let product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.send(product);
  })
);

// Add a new product
router.post(
  '/',
  auth,
  admin,
  asyncMiddleware(async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    let product = await prisma.product.create({
      data: req.body,
    });

    return res.send(product);
  })
);

// Update a product
router.put(
  '/:id',
  auth,
  admin,
  asyncMiddleware(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json('Incorrect id');

    const { error } = validateProductUpdate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // Check for product with given ID
    let product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Update product info
    product = await prisma.product.update({
      where: {
        id,
      },
      data: req.body,
    });

    res.send(product);
  })
);

module.exports = router;
