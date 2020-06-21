/**
 * @file Archivo principal del servidor. Importa a todos los submodulos para usarlos.
 */

const express = require('express');
const middlewares = require('./middlewares');

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.use(middlewares.custom404Middleware);
app.use(middlewares.customErrorHandlerMiddleware);

module.exports = app;
