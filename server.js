/* */


const cluster = require('cluster');
const os = require('os');

const cors = require('cors')({ origin: true });
const express = require('express');

const winston = require('winston');


const environment = process.env.NODE_ENV || 'dev';

const { version } = require('./package');

const settings = require(`./environment/public/settings.${environment}`); // eslint-disable-line


/* ************************************************************ */


settings.port = process.env.PORT || settings.port;


const logger = new winston.Logger({
  levels: winston.config.npm.levels,
  colors: winston.config.npm.colors,
  transports: [new winston.transports[settings.logger.transport](settings.logger.config)],
});


const workers = os.cpus().length;


/* ************************************************************ */


if (!/test/.test(environment) && cluster.isMaster) {
  logger.profile(`${environment}.master.start workers=${workers}`);


  cluster.on('online', worker => {
    logger.info(`${environment}.master.worker.online id=${worker.id}`);
  });

  cluster.on('exit', (worker, code, signal) => {
    logger.info(`${environment}.master.worker.exit   id=${worker.id} code=${signal || code}`);
    cluster.fork();
  });


  for (let i = 0; i < workers; i += 1) {
    cluster.fork();
  }


  logger.profile(`${environment}.master.start workers=${workers}`);
} else {
  const id = cluster.worker ? cluster.worker.id : process.pid;

  logger.profile(`${environment}.worker.start id=${id}`);


  const server = express();


  server.get('/', (req, res) => {
    cors(req, res, () => {
      res.json({ environment, version, workers });
    });
  });

  server.get('/kill', (req, res) => {
    if (!/test/.test(environment)) {
      cluster.worker.kill();
    }
    res.json({ worker: id });
  });

  server.get('/break', (req, res) => {
    res.status(500).json({ status: 500, code: 'Error' });
  });


  server.listen(settings.port, () => {
    logger.profile(`${environment}.worker.start id=${id}`);
  });


  module.exports = server;
}
