const router = require('express').Router();
const { validateCategory } = require('../lib/validators');
const prisma = require('../lib/prisma');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/asyncMiddleware');

// Get list of categories
router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    let categories = await prisma.category.findMany();
    res.send(categories);
  })
);

// Create new category
router.post(
  '/',
  auth,
  admin,
  asyncMiddleware(async (req, res) => {
    const { error } = validateCategory(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let category = await prisma.category.create({
      data: req.body,
    });

    res.send(category);
  })
);

// Update a category
router.put(
  '/:id',
  auth,
  admin,
  asyncMiddleware(async (req, res) => {
    const { error } = validateCategory(req.body);
    if (error) return res.status(400).json(error);

    // Check if a category exists with given ID
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json('Incorrect id');

    let category = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) return res.status(404).json('Category not found');

    // Update details
    category = await prisma.category.update({
      where: {
        id,
      },
      data: req.body,
    });

    // Return a message saying it was successful
    res.send('Category updated successfully');
  })
);

// Delete a category
router.delete(
  '/:id',
  auth,
  admin,
  asyncMiddleware(async (req, res) => {
    const id = parseInt(req.params.id);

    // Check for products belonging to category
    const products = await prisma.product.findMany({
      where: {
        categoryId: id,
      },
    });

    if (products.length > 0)
      return res
        .status(400)
        .json('Cannot delete category that contains products');

    // Check if category exists
    let category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) return res.status(404).json('Category not found');

    // Delete record
    category = await prisma.category.delete({
      where: {
        id,
      },
    });

    res.send('Category deleted successfully');
  })
);

// Get category by ID and their posts
router.get(
  '/:id',
  asyncMiddleware(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });
    res.send(data);
  })
);

module.exports = router;
