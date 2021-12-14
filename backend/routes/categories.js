const router = require('express').Router();
const { validateCategory } = require('../lib/validators');
const prisma = require('../lib/prisma');

// Get list of categories
router.get('/', async (req, res) => {
  let categories;
  try {
    categories = await prisma.category.findMany();
  } catch (err) {
    return res.send(500).json(err);
  }
  res.send(categories);
});

// Create new category
router.post('/', async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  let category;
  try {
    category = await prisma.category.create({
      data: req.body,
    });
  } catch (err) {
    return res.status(500).json(err);
  }

  return res.send(category);
});

module.exports = router;
