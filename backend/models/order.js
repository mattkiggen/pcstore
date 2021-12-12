const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Joi = require('joi');

async function createOrder(order) {
  let result = {};
  try {
    result.order = await prisma.order.create({
      data: order,
    });
  } catch (e) {
    result.error = e;
  } finally {
    await prisma.$disconnect();
  }
  return result;
}

async function getAllOrders(userId) {
  //...
}

module.exports = { createOrder };
