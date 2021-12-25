// Check if user is admin
function admin(req, res, next) {
  console.log(req.user);
  if (req.user.isAdmin) return next();
  res.status(401).json({ error: 'Access denied' });
}

module.exports = admin;
