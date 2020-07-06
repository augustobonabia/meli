/**
 * @file Contiene todos los endpoints de la app para obtener items.
 */

const express = require('express');
const sourceApiClient = require('./api-client');
const itemsUtils = require('./utils/items.utils');
const requestUtils = require('./utils/request.utils');

const router = express.Router();

// Response builders

async function buildItemsSearchResponse(req) {
  const searchResults = await sourceApiClient.getItems(req.query.q);
  const currencies = await sourceApiClient.getCurrencies();

  return {
    categories: await itemsUtils.buildSearchResponseCategories(searchResults),
    items: itemsUtils.buildSearchResponseItems(searchResults.results, currencies),
  };
}

async function buildItemResponse(req) {
  const itemId = req.params.id;
  const sourceItem = await sourceApiClient.getItem(itemId);
  const categoryPath = await sourceApiClient.getCategoryPath(sourceItem.category_id);
  const itemDescription = await sourceApiClient.getItemDescription(itemId);
  const currencies = await sourceApiClient.getCurrencies();

  return {
    item: itemsUtils.buildGetItemResponse(sourceItem, itemDescription, currencies),
    categories: categoryPath.map((category) => category.name),
  };
}

// Endpoints

router.get('', (req, res, next) => {
  requestUtils.requestWrapper(req, res, next, buildItemsSearchResponse);
});

router.get('/:id', (req, res, next) => {
  requestUtils.requestWrapper(req, res, next, buildItemResponse);
});

module.exports = router;
