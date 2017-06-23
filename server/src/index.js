require('babel-register');

const cluster = require('cluster');

if (cluster.isMaster) {
    const cpus = require('os').cpus().length * 2;
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log('[WARN] Worker %d died with code/signal %s. Restarting worker...', worker, code, signal);
        cluster.fork();
    });
} else {
    require('./app')
}


// const cluster = require('cluster')
//   , numCPUs = require('os').cpus().length
//   , bodyParser = require('koa-body-parser')
//   , cors = require('koa-cors')
//   , koa = require('koa')
//   , router = require('koa-router')()
//   , controller = require('./controller.js')
//   , app = module.exports = koa();

// if (cluster.isMaster) {
//   // Fork workers
//   console.log(`Detected ${numCPUs} CPUs, forking...`);
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

// } else {

//   app
//     .use(cors())
//     .use(bodyParser())
//     .use(router.routes())
//     .use(router.allowedMethods());

//   router
//     .get('/health', function *() {
//       this.body = 'up';
//       this.status = 200;
//     })
//     .post('/application', function *() {
//       try {
//         this.body = 'Success';
//         this.status = 200;
//       } catch (err) {
//         this.body = {"Error": err};
//         this.status = 400;
//       }
//     });

//   app.listen(8000);
// }
