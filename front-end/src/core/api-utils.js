import Axios from 'axios';
import appSettings from '../app-settings';

const baseURL = appSettings.apiBaseUrl;

async function get(path) {
  const response = await Axios.get(path, { baseURL });

  return response.data;
}

async function searchItems(searchTerm) {
  const results = await get(`items?q=${searchTerm}`);

  return {
    author: results.author,
    categories: results.categories,
    items: results.items,
  };
}

async function getItem(itemId) {
  const response = await get(`items/${itemId}`);

  return {
    item: response.item,
    categories: response.categories,
  };
}

export { searchItems, getItem };
