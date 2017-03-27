// @flow

import Koa from 'koa'
import config from './configs/server-config'
import middlewares from './middlewares'
import mongoose from 'mongoose'

const app = new Koa();

middlewares(app);

mongoose.connect(config.databaseHost);

// When successfully connected to mongodb
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + config.databaseHost);
    app.listen(config.port, () => {
        console.log('app start at ==>> ', config.host + ':' + config.port);
    });
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ', err);
});
