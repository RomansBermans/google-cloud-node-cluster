/* */


const chai = require('chai');
const http = require('chai-http');

const { expect } = chai;
chai.use(http);


const os = require('os');


const server = require('../server');


/* ************************************************************ */


const success = (res, result) => {
  expect(res).to.have.status(200);
  expect(res).to.be.json;
  if (result) {
    expect(res.body).to.deep.equal(result);
  }
};

const error = err => {
  expect(err).to.have.status(500);
  expect(err.response).to.be.json;
  expect(err.response.body.code).to.equal('Error');
};


/* ************************************************************ */


describe('server', () => {
  it('+ GET /', async () => {
    const res = await chai.request(server).get('/').set('origin', 'http://test.com');
    expect(res).to.have.header('access-control-allow-origin', 'http://test.com');
    success(res, { environment: 'test', version: '0.0.0-alpha.0', workers: os.cpus().length });
  });

  it('+ GET /kill', async () => {
    const res = await chai.request(server).get('/kill').set('origin', 'http://test.com');
    expect(res).not.to.have.header('access-control-allow-origin', 'http://test.com');
    success(res);
  });

  it('- GET /error', async () => {
    try {
      await chai.request(server).get('/error').set('origin', 'http://test.com');
      expect.fail();
    } catch (err) {
      expect(err).not.to.have.header('access-control-allow-origin', 'http://test.com');
      error(err);
    }
  });
});
