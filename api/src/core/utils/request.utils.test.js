const requestUtils = require('./request.utils');

describe.only('Utils', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('si la firma existe, sendOk debe agregar la firma al response', async (done) => {
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

    requestUtils.sendOk(res, {});
  });

  test('si la firma no existe, sendOk no debe agregar nada al response', async (done) => {
    const res = {
      send: (response) => {
        expect(response.author).toBeUndefined();
        done();
      },
    };

    requestUtils.sendOk(res, {});
  });

  test('requestWrapper debe llamar a sendOk con el body que arma requestHandler', async (done) => {
    const bodyMock = {
      id: 'MLA123',
      name: 'Mesa ratona',
    };

    jest.spyOn(requestUtils, 'sendOk').mockImplementation((res, body) => {
      expect(body).toBe(bodyMock);
      done();
    });

    requestUtils.requestWrapper({}, null, null, () => bodyMock);
  });
});
