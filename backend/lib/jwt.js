const jwt = require('jsonwebtoken');

function createToken(user) {
  const token = jwt.sign(user, process.env.JWT_SECRET);
  return token;
}

function decodeToken(token) {
  const data = {};
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    data.decoded = decoded;
  } catch (err) {
    data.error = err;
  }
  return data;
}

module.exports = { createToken, decodeToken };
