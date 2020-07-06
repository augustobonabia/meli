let settings;

const devSettings = {
  enableCORS: true,
  resultsLimit: 4,
  baseUrl: '/api',
  author: {
    name: 'Cosme',
    lastname: 'Fulanito',
  },
  logLevel: 'debug',
  logRequestObjsOnError: false,
  sourceApiBaseUrl: 'https://api.mercadolibre.com',
  port: 3000,
  signResponse: true,
};

const testSettings = {
  enableCORS: false,
  baseUrl: '',
  author: {
    name: 'Cosme',
    lastname: 'Fulanito',
  },
  logLevel: 'fatal',
  logRequestObjsOnError: false,
  port: null,
  signResponse: true,
  sourceApiBaseUrl: '',
};

const prodSettings = {
  enableCORS: true,
  resultsLimit: 4,
  baseUrl: '/api',
  author: {
    name: 'Augusto',
    lastname: 'Bonabía',
  },
  logLevel: 'info', // debug | error | fatal | trace | info | warn
  logRequestObjsOnError: true,
  port: 3000,
  signResponse: true,
  sourceApiBaseUrl: 'https://api.mercadolibre.com',
};

if (process.env.NODE_ENV === 'production') {
  settings = prodSettings;
} else if (process.env.NODE_ENV === 'development') {
  settings = devSettings;
} else if (process.env.NODE_ENV === 'test') {
  settings = testSettings;
} else {
  throw new Error('NODE_ENV environment variable not provided.');
}

module.exports = settings;
