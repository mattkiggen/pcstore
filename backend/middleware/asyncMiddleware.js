// Allows us to remove all try catch blocks from our routes
// and instead handles the error here

function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = asyncMiddleware;
