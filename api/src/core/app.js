/**
 * @file Archivo principal del servidor. Importa a todos los submodulos para usarlos.
 */

const express = require('express');
const items = require('./items.router');
const middlewares = require('./middlewares');

const app = express();

app.use(middlewares.setAuthor);

app.use('/items', items);

app.use(middlewares.custom404Middleware);
app.use(middlewares.customErrorHandlerMiddleware);

module.exports = app;
