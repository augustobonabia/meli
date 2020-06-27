const supertest = require('supertest');
const axios = require('axios');
const app = require('./app');

jest.mock('axios');
jest.mock('./utils/items.utils');

const request = supertest(app);

describe('Se debe agregar la firma a los métodos', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: {} });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  const testAuthor = (response) => {
    expect(response.status).toBe(200);
    expect(response.body.author).toEqual({
      name: 'Cosme',
      lastname: 'Fulanito',
    });
  };

  test('GET: /items"', async (done) => {
    jest.mock('./utils/items.utils', () => ({
      buildSearchResponseItems: () => [],
      buildSearchResponseCategories: async () => [],
    }));

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

  test.todo('Un error interno del servidor debe devolver un error 500');
});
