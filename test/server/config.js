/* */

const { settings, utils } = require('../config');

const chai = require('chai');
const http = require('chai-http');


/* ************************************************************ */


const expect = chai.expect;
chai.use(http);


/* ************************************************************ */


module.exports = {
  settings,
  utils,
  chai,
  expect,
};
