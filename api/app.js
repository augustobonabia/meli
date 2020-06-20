const bunyan = require('bunyan');
const express = require('express');

const log = bunyan.createLogger({
  name: 'Meli API',
});

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.use((err, req, res, next) => {
  log.error(err, req, res);
  res.status(500).send('Oops, something went wrong!');
  next();
});

app.listen(port, () => {
  log.info(`Listening at http://localhost:${port}`);
});
