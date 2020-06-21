const utils = require('./utils');

describe('Utils', () => {
  test('si la firma existe, sendOk debe agregar la firma', async (done) => {
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
});
