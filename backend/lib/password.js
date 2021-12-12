const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}

async function isValidPassword(password) {
  const isValid = await bcrypt.compare(password, hashed);
  return isValid;
}

module.exports = { hashPassword, isValidPassword };
