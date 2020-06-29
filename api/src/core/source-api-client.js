const axios = require('axios');
const env = require('../environment');
const log = require('../logger');

const baseURL = env.sourceApiBaseUrl;

async function get(path) {
  const response = (await axios.get(path, { baseURL })).data;

  const responseLogObj = { method: 'GET', baseURL, path };
  if (env.logRequestObjsOnError) {
    responseLogObj.response = response;
  }

  log.info(responseLogObj);

  return response;
}

module.exports = { get };
