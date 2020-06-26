const utils = require('./request.utils');

jest.unmock('./request-utils');

describe('Utils', () => {
  test.only('si la firma existe, sendOk debe agregar la firma', async (done) => {
    const res = {
      author: {
        name: 'Augusto',
        lastname: 'Bonabía',
      },
      send: (response) => {
        expect(response.author).toBe(res.author);
        done();
      },
    };

    utils.sendOk(res, { code: 'item_23' });
  });

  test('si la firma no existe, sendOk debe agregar nada', async (done) => {
    const res = {
      send: (response) => {
        expect(response.author).toBeUndefined();
        done();
      },
    };

    utils.sendOk(res, {});
  });

  test('requestWrapper debe llamar a sendOk con el body que arma requestHandler', async (done) => {
    const bodyMock = {
      id: 'MLA123',
      name: 'Mesa ratona',
    };

    utils.sendOk = jest.fn((res, body) => {
      expect(body).toBe(bodyMock);
      done();
    });

    utils.requestWrapper(null, null, null, () => bodyMock);
  });
});
