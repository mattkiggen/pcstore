const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create new record in database of specific table
async function create(table, data) {
  let result = {};
  try {
    result[table] = await prisma[table].create({
      data,
    });
  } catch (e) {
    result.error = e;
  } finally {
    await prisma.$disconnect();
  }
  return result;
}

// Get all records from database of specific table
async function getAll(table, options = {}) {
  let result = {};
  try {
    // Create plural of table for easier consumption
    const key = table + 's';
    result[key] = await prisma[table].findMany(options);
  } catch (e) {
    result.error = e;
  } finally {
    await prisma.$disconnect();
  }
  return result;
}

async function getById(table, options = {}) {
  let result = {};
  try {
    result[table] = await prisma[table].findUnique(options);
  } catch (e) {
    result.error = e;
  } finally {
    await prisma.$disconnect();
  }
  return result;
}

module.exports = { create, getAll, getById };
