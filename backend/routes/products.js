const router = require('express').Router();
const {
  createProduct,
  validateProduct,
  getAllProducts,
  getProductById,
} = require('../models/product');

// Get all products
router.get('/', async (req, res) => {
  const result = await getAllProducts();
  if (result.error)
    return res
      .status(400)
      .json({ message: 'Error fetching products', error: result.error });
  res.status(200).json({ data: result.products });
});

// Get product by ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await getProductById(id);
  if (!result.product)
    return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(result.product);
});

// Add a new product
router.post('/', async (req, res) => {
  // validate data
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  // create new record
  const result = await createProduct(req.body);
  if (result.error)
    return res
      .status(400)
      .json({ message: 'Error creating product', error: result.error });

  res.status(200).json(result.product);
});

module.exports = router;
