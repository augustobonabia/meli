/**
 * @file Levanta la aplicación en el puerto configurado
 */

const log = require('./logger');
const app = require('./core/app');
const env = require('./environment');

log.info(`Environment: ${process.env.NODE_ENV}`);
app.listen(env.port, () => log.info(`Listening at http://localhost:${env.port}`));
