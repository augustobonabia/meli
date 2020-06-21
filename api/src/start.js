/**
 * @file Levanta la aplicación en el puerto configurado
 */

const log = require('./logger');
const app = require('./app');

const port = 3000;

app.listen(port, () => log.info(`Listening at http://localhost:${port}`));
