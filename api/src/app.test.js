const supertest = require('supertest');
const app = require('./app');

const request = supertest(app);

test('El response a un GET del directorio raiz debe devolver "Hello World!"', async (done) => {
  const response = await request.get('/');

  expect(response.status).toBe(200);
  expect(response.text).toBe('Hello World!');
  done();
});
