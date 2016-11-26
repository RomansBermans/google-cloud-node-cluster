/* eslint-disable global-require */

const { environment, version, settings, logger } = require('./config');

const cluster = require('cluster');
const os = require('os');
const restify = require('restify');

const errors = require('@google/cloud-errors').start();


/* ************************************************************ */


const workers = os.cpus().length;

if (!/test/.test(environment) && cluster.isMaster) {
  logger.profile(`${environment}.master.start workers=${workers}`);

  cluster.on('online', worker => {
    logger.info(`${environment}.master.event.online worker=${worker.id}`);
  });

  cluster.on('exit', (worker, code, signal) => {
    logger.info(`${environment}.master.event.exit worker=${worker.id} code=${code} signal=${signal}`);
    cluster.fork();
  });

  for (let i = 0; i < workers; i += 1) {
    cluster.fork();
  }

  logger.profile(`${environment}.master.start workers=${workers}`);
} else {
  const id = cluster.worker ? cluster.worker.id : process.pid;

  logger.profile(`${environment}.worker.${id}.start`);


  const server = module.exports = restify.createServer();


  server.use(errors.restify(server));
  server.use(restify.CORS());
  server.use(restify.queryParser());
  server.use(restify.bodyParser());


  server.get('/', (req, res) =>
    res.json({ environment, version, workers })
  );

  server.get('/kill', (req, res) => {
    if (!/test/.test(environment)) {
      cluster.worker.kill();
    }
    res.json({ worker: id });
  });

  server.get('/error', (req, res) =>
    res.json(500, { error: { status: 500, code: 'Error' } })
  );


  server.listen(settings.port, () => {
    logger.info(`${environment}.worker.${id}.address`, server.url);
    logger.profile(`${environment}.worker.${id}.start`);
  });
}
