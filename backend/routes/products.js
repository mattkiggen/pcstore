const router = require('express').Router();
const {
  createProduct,
  validateProduct,
  getAllProducts,
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

// Add a new product
router.post('/', async (req, res) => {
  // validate data
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  // create new record
  const result = await createProduct(req.body);
  if (result.error)
    return res
      .send(400)
      .json({ message: 'Error creating product', error: result.error });

  res.status(200).json(result.product);
});

module.exports = router;
