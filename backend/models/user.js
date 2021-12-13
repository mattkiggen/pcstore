const { create } = require('../lib/data');
const Joi = require('joi');

// returns a result object that contains either the new user or an error object
async function createUser(user) {
  const result = await create('user', user);
  return result;
}

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().required().min(3).max(50),
    lastName: Joi.string().required().min(3).max(50),
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().required(),
    streetNumber: Joi.string().required().min(1).max(10),
    streetName: Joi.string().required().min(3).max(255),
    province: Joi.string().required().min(3).max(50),
    country: Joi.string().required().min(3).max(50),
    postalCode: Joi.string().required().min(3).max(10),
  });
  return schema.validate(user);
}

module.exports = { createUser, validateUser };
