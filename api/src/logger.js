const bunyan = require('bunyan');
const env = require('./environment');

module.exports = bunyan.createLogger({
  name: 'Meli API',
  level: env.logLevel,
});
