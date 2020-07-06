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

async function getCategoryPath(categoryId) {
  const response = await get(`categories/${categoryId}?attributes=path_from_root`);

  return response.path_from_root;
}

async function getCurrencies() {
  const { currencies } = await get('sites/MLA?attributes=currencies');
  return currencies;
}

function getItems(searchTerm) {
  return get(`sites/MLA/search?q=${searchTerm}&attributes=filters,available_filters,results&limit=${env.resultsLimit}`);
}

function getItem(id) {
  return get(`items/${id}?attributes=id,title,price,currency_id,pictures,condition,shipping,sold_quantity,category_id`);
}

async function getItemDescription(id) {
  const response = await get(`items/${id}/description?attributes=plain_text`);
  return response.plain_text;
}

module.exports = {
  getItems,
  getCurrencies,
  getItem,
  getItemDescription,
  getCategoryPath,
};
