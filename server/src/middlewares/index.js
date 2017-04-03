// @flow

import router from '../routers'
import bodyParser from 'koa-bodyparser'

export default ( app ) => {
    app.use( bodyParser() )
    app.use( async ( ctx, next ) => {
        try {
            await next();
        } catch (err) {
            ctx.body = err || err.message;
            ctx.status = err.status || 500;
        }
    })
    app.use(router.routes())
        .use(router.allowedMethods());
};
