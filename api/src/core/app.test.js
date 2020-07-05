const supertest = require('supertest');
const app = require('./app');
const sourceApiClient = require('./source-api-client');

jest.mock('./source-api-client', () => ({
  get: () => ({}),
}));

jest.mock('./utils/items.utils', () => ({
  buildSearchResponseItems: () => [],
  buildSearchResponseCategories: () => [],
  buildGetItemResponse: () => ({ item: {} }),
}));

const request = supertest(app);

describe('Se debe agregar la firma a las respuestas de los endpoints', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  const testAuthor = (response) => {
    expect(response.status).toBe(200);
    expect(response.body.author).toEqual({
      name: 'Cosme',
      lastname: 'Fulanito',
    });
  };

  test('GET: /items"', async (done) => {
    const response = await request.get('/items');

    testAuthor(response);
    done();
  });

  test('GET: /items/:id"', async (done) => {
    const response = await request.get('/items/854');

    testAuthor(response);
    done();
  });
});

describe('Response errors', () => {
  test('Un request a un endopoint que no existe debe devolver un error 404', async (done) => {
    const randomPath = '/random';
    const getResponse = await request.get(randomPath);

    expect(getResponse.status).toBe(404);
    expect(getResponse.text).toBe(`Oops, cannot GET: "${randomPath}"`);

    const postResponse = await request.post(randomPath).send({});
    expect(postResponse.status).toBe(404);
    expect(postResponse.text).toBe(`Oops, cannot POST: "${randomPath}"`);
    done();
  });

  test('Un error interno del servidor debe devolver un error 500', async () => {
    sourceApiClient.get = jest.fn().mockImplementation(() => {
      throw new Error('random error');
    });

    const response = await request.get('/items');
    expect(response.status).toBe(500);
    expect(response.text).toBe('Oops, something went wrong!');
  });
});
