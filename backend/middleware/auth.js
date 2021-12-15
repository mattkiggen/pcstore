const { decodeToken } = require('../lib/jwt');

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  const { decoded, error } = decodeToken(token);
  if (error) return res.status(400).send('Invalid token.');

  req.user = decoded;
  next();
}

module.exports = auth;
