const jwt = require('jsonwebtoken');

function createToken(user) {
  const token = jwt.sign(user, process.env.JWT_SECRET);
  return token;
}

function decodeToken(token) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}

module.exports = { createToken, decodeToken };
