import routes from '../routers'
import bodyParser from 'koa-bodyparser'

export default ( app ) => {
    app.use( bodyParser() )
    app.use( async ( ctx, next ) => {
        try {
            await next();
        } catch (err) {
            ctx.body = { message: err.message };
            ctx.status = err.status || 500;
        }
    })
    app.use( routes.routes() )
    app.use( routes.allowedMethods() )
};
