import Koa from 'koa'
import config from './configs/server-config'
import middlewares from './middlewares'
import mongoose from 'mongoose'

const app = new Koa();

middlewares(app);

mongoose.connect(config.getDatabaseHost());

process.env.NODE_ENV !== 'test' && mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open to ' + config.getDatabaseHost());
    app.listen(config.getPort(), () => {
        console.log('app start at ==>> ', config.getHost() + ':' + config.getPort());
    });
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ', err);
});

export default () => {
    mongoose.connection.on('connected', () => {
        app.listen(config.getPort());
    });
};
