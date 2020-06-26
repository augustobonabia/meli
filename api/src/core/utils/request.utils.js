const log = require('../../logger');

/** @returns true si el parámetro es un objeto */
function isObject(o) {
  return typeof o === 'object';
}

/**
 * Permite enviar una respuesta HTTP=200.
 * Sólo permite enviar objetos. Añade la firma configurada para el entorno.
 * @param res Objeto response de express.
 * @param body Contenido de la respuesta al que se le agrega la firma si corresponde.
 */
function sendOk(res, body) {
  let response = body;

  if (!isObject(body)) {
    throw new Error('Response content must be an object.');
  }

  if (res.author) {
    response = { author: res.author, ...response };
  }

  res.send(response);
}

/**
 * Wrapper para manejar un request.
 * Encapsula los errores para delegarlos a los middlewares que estén configurados.
 * Evita que las funciones dedicadas a manejar los requests de los endpoints manipulen directamente
 * el objeto response de express.
 * @param req Objeto request de express.
 * @param res Objeto response de express.
 * @param next Función de express para invocar al siguiente middleware.
 * @param requestHandler Función que maneja los request de un endponint en particular.
 */
async function requestWrapper(req, res, next, requestHandler) {
  try {
    const reqLogObj = {
      method: req.method,
      relativePath: req.path,
      ...req.query,
    };
    log.info(reqLogObj, 'Request received');

    const body = await requestHandler(req);
    sendOk(res, body);

    log.info(reqLogObj, 'Response OK');
  } catch (e) {
    next(e);
  }
}

module.exports = {
  sendOk,
  requestWrapper,
};
