import Axios from 'axios';
import appSettings from '../appSettings';

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

function getItem() {
}

export { searchItems, getItem };
