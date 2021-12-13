const { create, getAll, getById } = require('../lib/data');
const Joi = require('joi');

async function createProduct(product) {
  const result = await create('product', product);
  return result;
}

async function getAllProducts() {
  const result = await getAll('product', { include: { category: true } });
  return result;
}

async function getProductById(id) {
  const result = await getById('product', { where: { id } });
  return result;
}

function validateProduct(product) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    productImage: Joi.string().min(3).max(500).required(),
    description: Joi.string().min(3).max(5000).required(),
    price: Joi.number().required(),
    productCode: Joi.string().min(3).max(255),
    categoryId: Joi.number().required(),
    numberInStock: Joi.number(),
  });
  return schema.validate(product);
}

module.exports = {
  createProduct,
  validateProduct,
  getAllProducts,
  getProductById,
};
