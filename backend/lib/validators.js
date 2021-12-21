const Joi = require('joi');

function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });
  return schema.validate(category);
}

function validateProduct(product) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    image: Joi.string().min(3).required(),
    price: Joi.number().required(),
    numberInStock: Joi.number(),
    categoryId: Joi.number().required(),
  });
  return schema.validate(product);
}

function validateProductUpdate(product) {
  const schema = Joi.object({
    title: Joi.string().min(3),
    description: Joi.string().min(3),
    image: Joi.string().min(3),
    price: Joi.number(),
    numberInStock: Joi.number(),
    categoryId: Joi.number(),
  });
  return schema.validate(product);
}

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().required().min(3).max(50),
    lastName: Joi.string().required().min(3).max(50),
    email: Joi.string().required().email(),
    phone: Joi.string(),
    password: Joi.string().required(),
    streetNumber: Joi.string().min(1).max(10),
    streetName: Joi.string().min(3).max(255),
    city: Joi.string().min(3).max(50),
    postalCode: Joi.string().min(3).max(10),
  });

  return schema.validate(user);
}

function validateUserUpdateInfo(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(50),
    lastName: Joi.string().min(3).max(50),
    phone: Joi.string(),
    streetNumber: Joi.string().min(1).max(10),
    streetName: Joi.string().min(3).max(255),
    city: Joi.string().min(3).max(50),
    postalCode: Joi.string().min(3).max(10),
  });
  return schema.validate(user);
}

module.exports = {
  validateCategory,
  validateProduct,
  validateUser,
  validateUserUpdateInfo,
  validateProductUpdate,
};
