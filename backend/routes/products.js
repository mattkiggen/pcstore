const router = require('express').Router();
const prisma = require('../lib/prisma');
const { validateProduct, validateProductUpdate } = require('../lib/validators');

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
  if (isNaN(id)) return res.status(400).json('Incorrect id');

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

router.put('/:id', async (req, res) => {
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
});

module.exports = router;
