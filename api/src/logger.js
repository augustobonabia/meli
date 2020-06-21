const bunyan = require('bunyan');

const log = bunyan.createLogger({
  name: 'Meli API',
});

module.exports = log;
