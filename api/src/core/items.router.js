/**
 * @file Contiene todos los endpoints de la app para obtener items.
 */

const express = require('express');
const env = require('../environment');
const sourceApiClient = require('./source-api-client');
const itemsUtils = require('./utils/items.utils');
const requestUtils = require('./utils/request.utils');

const router = express.Router();

// Response builders

async function buildItemsSearchResponse(req) {
  const searchResults = await sourceApiClient.get(`sites/MLA/search?q=${req.query.q}&attributes=filters,available_filters,results&limit=${env.resultsLimit}`);
  const { currencies } = await sourceApiClient.get('sites/MLA?attributes=currencies');

  return {
    categories: await itemsUtils.buildSearchResponseCategories(searchResults),
    items: itemsUtils.buildSearchResponseItems(searchResults.results, currencies),
  };
}

async function buildItemResponse(req) {
  const item = await sourceApiClient.get(`items/${req.params.id}`);
  const itemDescription = await sourceApiClient.get(`items/${req.params.id}/description`);
  const { currencies } = await sourceApiClient.get('sites/MLA?attributes=currencies');

  return itemsUtils.buildGetItemResponse(item, itemDescription, currencies);
}

// Endpoints

router.get('', (req, res, next) => {
  requestUtils.requestWrapper(req, res, next, buildItemsSearchResponse);
});

router.get('/:id', (req, res, next) => {
  requestUtils.requestWrapper(req, res, next, buildItemResponse);
});

module.exports = router;
