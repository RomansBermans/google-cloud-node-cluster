/* */

const { utils, settings } = require('../config');

const chai = require('chai');
const http = require('chai-http');


/* ************************************************************ */


const expect = chai.expect;
chai.use(http);


/* ************************************************************ */


module.exports = {
  utils,
  settings,
  chai,
  expect,
};
