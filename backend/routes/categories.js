const router = require('express').Router();
const { validateCategory } = require('../lib/validators');
const prisma = require('../lib/prisma');
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
  asyncMiddleware(async (req, res) => {
    const { error } = validateCategory(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let category = await prisma.category.create({
      data: req.body,
    });

    res.send(category);
  })
);

// Update category
router.put('/:id', async (req, res) => {
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
});

module.exports = router;
