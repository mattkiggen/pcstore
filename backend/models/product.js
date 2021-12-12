const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Joi = require('joi');

async function createProduct(product) {
  let result = {};
  try {
    result.product = await prisma.product.create({
      data: product,
    });
  } catch (e) {
    result.error = e;
  } finally {
    await prisma.$disconnect();
  }
  return result;
}

async function getAllProducts() {
  let result = {};
  try {
    result.products = await prisma.product.findMany();
  } catch (e) {
    result.error = e;
  } finally {
    await prisma.$disconnect();
  }
  return result;
}

function validateProduct(product) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    productImage: Joi.string().min(3).max(500).required(),
    description: Joi.string().min(3).max(5000).required(),
    price: Joi.number().required(),
    productCode: Joi.string().min(3).max(255),
    category: Joi.string().min(3).max(255),
    numberInStock: Joi.number(),
  });
  return schema.validate(product);
}

module.exports = { createProduct, validateProduct, getAllProducts };
