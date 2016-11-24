/* eslint-disable global-require */

const environment = process.env.NODE_ENV || 'dev';

const settings = require(`../environment/public/settings.${environment}`);
const { version } = require('../package');

const assign = (...a) => require('assign-deep')({}, ...a);
const winston = require('winston');

if (/stag|prod/.test(environment)) {
  require('@google/cloud-trace').start();
  require('@google/cloud-debug').start();
}


/* ************************************************************ */


settings.port = process.env.PORT || settings.port;


const logger = new winston.Logger({
  levels: winston.config.npm.levels,
  colors: winston.config.npm.colors,
  transports: [new winston.transports[settings.logger.transport](settings.logger.config)],
});


/* ************************************************************ */


const $ = {
  environment,
  settings,
  version,
  logger,
  utils: {
    assign,
  },
};


module.exports = $;
