import axios from 'axios';

// eslint-disable-next-line no-undef
const baseURL = API_BASE_URL;

function getCancelTokenSource() {
  return axios.CancelToken.source();
}

function requestCleaner(source) {
  return () => source.cancel('Request cancelado por el usuario');
}

async function get(path, source) {
  const response = await axios.get(path, { baseURL, cancelToken: source.token });

  return response.data;
}

async function searchItems(searchTerm, source) {
  const results = await get(`items?q=${searchTerm}`, source);

  return {
    author: results.author,
    categories: results.categories,
    items: results.items,
  };
}

async function getItem(itemId, source) {
  const response = await get(`items/${itemId}`, source);

  return {
    item: response.item,
    categories: response.categories,
  };
}

export {
  searchItems,
  getItem,
  getCancelTokenSource,
  requestCleaner,
};
