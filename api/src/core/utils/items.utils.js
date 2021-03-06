const sanitizeHtml = require('sanitize-html');
const sourceApiClient = require('../api-client');

const itemsUtils = {};

itemsUtils.buildItemPrice = (price, currencyId, currencies) => {
  if (price === null) {
    return null;
  }

  const amount = Math.trunc(price);
  const unroundedPriceDecimals = (price - amount) * 100;

  return {
    currency: currencies
      .find((currency) => currency.id === currencyId)
      .symbol,
    amount,
    decimals: Math.round(unroundedPriceDecimals),
  };
};

itemsUtils.buildGetItemResponsePicture = (pictures) => {
  const firstPictureOrUndefined = pictures.find((p) => p);

  if (!firstPictureOrUndefined) {
    return null;
  }

  return firstPictureOrUndefined.secure_url || firstPictureOrUndefined.url;
};

/**
 * Construye el array de items del listado de búsqueda.
 * @param sourceResults - Resultados de la API fuente
 * @param currencies Monedas disponibles.
 * @returns Array de items.
 */
itemsUtils.buildSearchResponseItems = (sourceResults, currencies) => sourceResults
  .map((sourceResult) => ({
    id: sourceResult.id,
    title: sanitizeHtml(sourceResult.title),
    price: itemsUtils.buildItemPrice(
      sourceResult.price,
      sourceResult.currency_id,
      currencies,
    ),
    picture: sourceResult.thumbnail,
    condition: sourceResult.condition,
    free_shipping: sourceResult.shipping.free_shipping,
    location: (sourceResult.address && sourceResult.address.state_name) || null,
  }));

itemsUtils.buildGetItemResponse = (sourceItem, itemDescription, currencies) => ({
  id: sourceItem.id,
  title: sanitizeHtml(sourceItem.title),
  price: itemsUtils.buildItemPrice(
    sourceItem.price,
    sourceItem.currency_id,
    currencies,
  ),
  picture: itemsUtils.buildGetItemResponsePicture(sourceItem.pictures),
  condition: sourceItem.condition,
  free_shipping: sourceItem.shipping.free_shipping,
  sold_quantity: sourceItem.sold_quantity,
  description: sanitizeHtml(itemDescription),
});

/**
 * @async Construye el path de categorías de la categoría que más resultados obtuvo del listado
 *        de búsqueda
 * @param sourceResults Resultados de la API fuente.
 * @returns Array ordenado de strings con los nombres de las categorías que se corresponden
 *          con la categoría que más resultados obtuvo, donde el primer elemento es la categría
 *          raíz y el último elemento es la categoría que más resultados obtuvo.
 */
itemsUtils.buildSearchResponseCategories = async (searchResults) => {
  // Si no hay resultados en la búsqueda tampoco hay un path de categorías
  if (!searchResults.results.length) {
    return [];
  }

  const appliedCategoryFilter = searchResults.filters.find((filter) => filter.id === 'category');
  let categoryPath = null;

  // Si hay un filtro de categoría aplicado se obtiene su path.
  // Si no hay un filtro aplicado, se busca qué filtro tiene más resultados y se obtiene su path.
  if (appliedCategoryFilter) {
    categoryPath = appliedCategoryFilter.values[0].path_from_root;
  } else {
    const availableCategoryFilters = searchResults.available_filters.find((filter) => filter.id === 'category');

    if (availableCategoryFilters) {
      const bestCategoryId = availableCategoryFilters.values.reduce((prev, current) => {
        if (current.results > prev.results) {
          return current;
        }

        return prev;
      }, { results: 0 }).id;

      categoryPath = await sourceApiClient.getCategoryPath(bestCategoryId);
    }
  }

  return categoryPath.map((cat) => cat.name);
};

module.exports = itemsUtils;
