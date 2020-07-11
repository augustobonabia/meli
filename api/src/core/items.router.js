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
  const [searchResults, currencies] = await await Promise.all([
    sourceApiClient.getItems(req.query.q),
    sourceApiClient.getCurrencies(),
  ]);

  return {
    categories: await itemsUtils.buildSearchResponseCategories(searchResults),
    items: itemsUtils.buildSearchResponseItems(searchResults.results, currencies),
  };
}

async function buildItemResponse(req) {
  const itemId = req.params.id;

  const [sourceItem, itemDescription, currencies] = await Promise.all([
    sourceApiClient.getItem(itemId),
    sourceApiClient.getItemDescription(itemId),
    sourceApiClient.getCurrencies(),
  ]);
  const categoryPath = await sourceApiClient.getCategoryPath(sourceItem.category_id);

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
