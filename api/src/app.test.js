const supertest = require('supertest');
const app = require('./app');

const request = supertest(app);

test('El response a un GET del directorio raiz debe devolver "Hello World!"', async (done) => {
  const response = await request.get('/');

  expect(response.status).toBe(200);
  expect(response.text).toBe('Hello World!');
  done();
});

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
