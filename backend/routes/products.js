const router = require('express').Router();
const prisma = require('../lib/prisma');
const { validateProduct } = require('../lib/validators');

// Get all products
router.get('/', async (req, res) => {
  let products;
  try {
    products = await prisma.product.findMany();
  } catch (err) {
    return res.status(500).json(err);
  }

  res.send(products);
});

// Get product by ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  let product;
  try {
    product = await prisma.product.findUnique({
      where: { id },
    });
  } catch (err) {
    return res.status(500).json(err);
  }

  if (!product) return res.status(404).json({ error: 'Product not found' });

  res.send(product);
});

// Add a new product
router.post('/', async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let product;
  try {
    product = await prisma.product.create({
      data: req.body,
    });
  } catch (err) {
    return res.status(500).json(err);
  }

  return res.send(product);
});

module.exports = router;
