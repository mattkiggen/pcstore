const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// returns a result object that contains either the new user or an error object
async function createUser(newUser) {
  let result = {};
  try {
    result.user = await prisma.user.create({
      data: newUser,
    });
  } catch (err) {
    result.error = err;
  } finally {
    prisma.$disconnect();
  }
  return result;
}

module.exports = { createUser };
