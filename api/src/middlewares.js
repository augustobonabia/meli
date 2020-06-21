const log = require('./logger');

function custom404Middleware(req, res) {
  res.status(404).send(`Oops, cannot ${req.method}: "${req.path}"`);
}

function customErrorHandlerMiddleware(err, req, res, next) {
  log.error(err, req, res);
  res.status(500).send('Oops, something went wrong!');
  next();
}

module.exports = {
  custom404Middleware,
  customErrorHandlerMiddleware,
};
