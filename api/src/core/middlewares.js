const log = require('../logger');
const env = require('../environment');

function custom404Middleware(req, res) {
  res.status(404).send(`Oops, cannot ${req.method}: "${req.path}"`);
}

function customErrorHandlerMiddleware(err, req, res, next) {
  if (env.logRequestObjsOnError) {
    log.error(err, req, res);
  } else {
    log.error(err);
  }

  res.status(500).send('Oops, something went wrong!');
  next();
}

function setAuthor(req, res, next) {
  if (env.signResponse) {
    if (!env.author) {
      throw new Error('No author provided.');
    }
    if (!env.author.name || !env.author.lastname) {
      throw new Error('Bad author provided.');
    }

    res.author = {
      name: env.author.name,
      lastname: env.author.lastname,
    };
  }

  next();
}

module.exports = {
  custom404Middleware,
  customErrorHandlerMiddleware,
  setAuthor,
};
