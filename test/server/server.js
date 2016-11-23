/* eslint-disable no-unused-expressions */

const { chai, expect } = require('./config');

const server = require('../../server/server');

const os = require('os');


/* ************************************************************ */


const success = (res, result) => {
  expect(res).to.be.json;
  expect(res).to.have.status(200);
  if (result) {
    expect(res.body).to.deep.equal(result);
  }
};

const error = err => {
  expect(err).to.have.status(500);
  expect(err.response.body.error.code).to.equal('Error');
};


/* ************************************************************ */


describe('server', () => {
  describe('user:anonymous', () => {
    it('/ GET', () =>
      chai.request(server)
      .get('/')
      .set('origin', 'test')
      .then(res => {
        expect(res).to.have.header('access-control-allow-origin', 'test');
        success(res, { environment: 'test', version: '0.0.0-alpha.0', workers: os.cpus().length });
      })
    );

    it('/kill GET', () =>
      chai.request(server)
      .get('/kill')
      .then(success)
    );

    it('/error !GET', () =>
      chai.request(server)
      .get('/error')
      .catch(error)
    );
  });
});
