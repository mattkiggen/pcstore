function error(err, req, res, next) {
  // TODO: refactor this so we can provide detailed errors
  console.log(err);
  res.status(500).send('Something broke!');
}

module.exports = error;
