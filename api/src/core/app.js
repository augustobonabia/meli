/**
 * @file Archivo principal del servidor. Importa a todos los submodulos para usarlos.
 */

const express = require('express');
const cors = require('cors');
const items = require('./items.router');
const middlewares = require('./middlewares');
const env = require('../environment');

const app = express();
app.use(cors());

app.use(middlewares.setAuthor);

app.use(`${env.baseUrl}/items`, items);

app.use(middlewares.custom404Middleware);
app.use(middlewares.customErrorHandlerMiddleware);

module.exports = app;
