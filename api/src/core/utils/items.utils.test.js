const itemsUtils = require('./items.utils');

const currencies = [
  {
    id: 'USD',
    symbol: 'U$S',
  },
  {
    id: 'ARS',
    symbol: '$',
  },
];

describe(`Listado de búsqueda - items - ${itemsUtils.buildSearchResponseItemPrice.name}`, () => {
  test('genera la cantidad correcta de monto y "decimales" de un precio con un decimal', () => {
    const result = {
      price: 2459.9,
      currency_id: 'USD',
    };

    const itemPrice = itemsUtils.buildSearchResponseItemPrice(result, currencies);

    expect(itemPrice.amount).toBe(2459);
    expect(itemPrice.decimals).toBe(90);
  });

  test('genera la cantidad correcta de monto y "decimales" de un precio con 2 decimales', () => {
    const result = {
      price: 2459.97,
      currency_id: 'USD',
    };

    const itemPrice = itemsUtils.buildSearchResponseItemPrice(result, currencies);

    expect(itemPrice.amount).toBe(2459);
    expect(itemPrice.decimals).toBe(97);
  });

  test('genera la cantidad correcta de monto y "decimales" de un precio sin decimales', () => {
    const result = {
      price: 2459,
      currency_id: 'USD',
    };

    const itemPrice = itemsUtils.buildSearchResponseItemPrice(result, currencies);

    expect(itemPrice.amount).toBe(2459);
    expect(itemPrice.decimals).toBe(0);
  });

  test('obtiene el símbolo correcto de la moneda', () => {
    const result1 = {
      price: 1,
      currency_id: 'USD',
    };

    expect(itemsUtils.buildSearchResponseItemPrice(result1, currencies).currency).toBe('U$S');

    const result2 = {
      price: 2,
      currency_id: 'ARS',
    };

    expect(itemsUtils.buildSearchResponseItemPrice(result2, currencies).currency).toBe('$');
  });
});

describe(`Listado de búsqueda - items - ${itemsUtils.buildSearchResponseItems.name}`, () => {
  test('una lista con varios resultados debe construir los items en el formato correcto', () => {
    const priceBuilderSpy = jest.spyOn(itemsUtils, 'buildSearchResponseItemPrice').mockReturnValue(null);
    const results = [{
      id: 'MLA834484947',
      title: 'Mochila Notebook Case Logic Query 29 L Azul Y Verde -cuotas',
      shipping: {
        free_shipping: true,
      },
      condition: 'new',
      thumbnail: 'http://mla-s2-p.mlstatic.com/761434-MLA40103186494_122019-I.jpg',
      category_id: 'MLA16543',
    }, {
      id: 'MLA829880187',
      title: 'Mesa de cuatro patas',
      shipping: {
        free_shipping: false,
      },
      condition: 'used',
      thumbnail: 'http://mla-s2-p.mlstatic.com/761434-MLA40103186494_122019-I.jpg',
      category_id: 'MLA16543',
    }];

    const items = itemsUtils.buildSearchResponseItems(results, currencies);

    expect(items[0]).toStrictEqual({
      id: 'MLA834484947',
      title: 'Mochila Notebook Case Logic Query 29 L Azul Y Verde -cuotas',
      price: null,
      picture: 'http://mla-s2-p.mlstatic.com/761434-MLA40103186494_122019-I.jpg',
      condition: 'new',
      free_shipping: true,
    });

    expect(items[1]).toStrictEqual({
      id: 'MLA829880187',
      title: 'Mesa de cuatro patas',
      price: null,
      picture: 'http://mla-s2-p.mlstatic.com/761434-MLA40103186494_122019-I.jpg',
      condition: 'used',
      free_shipping: false,
    });

    priceBuilderSpy.mockRestore();
  });

  test('si no se obtuvieron resultados en la API fuente la función se debe ejecutar sin errores y retornar un array vacío', () => {
    expect(itemsUtils.buildSearchResponseItems([], currencies)).toStrictEqual([]);
  });
});

describe(`Listado de búsqueda - items - ${itemsUtils.buildSearchResponseCategories.name}`, () => {
  test.todo('debe devolver un array de nombres de categorías cuando hay un filtro aplicado');

  test.todo('debe  devolver un array de nombres de categorías cuando no hay un filtro aplicado y hay filtros de categorías para aplicar');

  test.todo('no debe fallar si en la API fuente no se encontraron resultados');
});
