/* */

const environment = process.env.NODE_ENV = 'test';

const { utils } = require('../server/config');

const settings = require(`../environment/public/settings.${environment}`);


/* ************************************************************ */


module.exports = {
  settings,
  utils,
};
