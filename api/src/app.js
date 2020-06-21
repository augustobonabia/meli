/**
 * @file Archivo principal del servidor. Importa a todos los submodulos para usarlos.
 */

const express = require('express');
const middlewares = require('./middlewares');
const utils = require('./utils');

const app = express();

app.use(middlewares.setAuthor);

app.get('/items', (req, res) => utils.sendOk(res, { }));
app.get('/items/:id', (req, res) => utils.sendOk(res, { }));

app.use(middlewares.custom404Middleware);
app.use(middlewares.customErrorHandlerMiddleware);

module.exports = app;
