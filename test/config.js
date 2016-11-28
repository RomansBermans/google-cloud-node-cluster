/* */

const environment = /test/.test(process.env.NODE_ENV) ? 'test' : 'dev';

const { utils } = require('../server/config');


/* ************************************************************ */


const settings = require(`../environment/public/settings.${environment}`);


/* ************************************************************ */


module.exports = {
  settings,
  utils,
};
