/* */

const environment = process.env.NODE_ENV = 'test';

const { utils } = require('../server/config');


/* ************************************************************ */


const settings = utils.assign(
  require(`../environment/public/${environment}/settings`),
  require(`../environment/private/${environment}/settings`)
);


/* ************************************************************ */


module.exports = {
  utils,
  settings,
};
