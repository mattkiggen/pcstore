function error(err, req, res, next) {
  // TODO: refactor this so we can provide detailed errors
  // can create an error object and pass it here, then set a dynamic status
  console.log(err);
  res.status(500).send('Something broke!');
}

module.exports = error;
