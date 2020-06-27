const axios = require('axios');
const env = require('../environment');
const log = require('../logger');

const { sourceApiBaseUrl } = env;

async function get(path) {
  const url = `${sourceApiBaseUrl}/${path}`;

  log.info(`GET: ${url}`);

  const response = (await axios.get(url)).data;

  const responseLogObj = { method: 'GET', url };
  if (env.logRequestObjsOnError) {
    responseLogObj.response = response;
  }

  log.info(responseLogObj);

  return response;
}

module.exports = { get };
