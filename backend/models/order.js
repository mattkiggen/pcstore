const { create } = require('../lib/data');
const Joi = require('joi');

async function createOrder(order) {
  const result = await create('order', order);
  return result;
}

async function getAllOrders(userId) {
  //...
}

module.exports = { createOrder };
