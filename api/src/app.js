/**
 * @file Archivo principal del servidor. Importa a todos los submodulos para usarlos.
 */

const express = require('express');
const log = require('./logger');

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

// Error handler middleware
app.use((err, req, res, next) => {
  log.error(err, req, res);
  res.status(500).send('Oops, something went wrong!');
  next();
});

module.exports = app;
