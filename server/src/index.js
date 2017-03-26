import Koa from 'koa'
import appConfig from './configs/server-config'
import middlewares from './middlewares'

import './db'

const app = new Koa();

middlewares(app);

app.listen(appConfig.port, () => {
    console.log('app start at ==>> ', appConfig.host + ':' + appConfig.port);
});
