import router from '../routers'
import bodyparser from 'koa-bodyparser'

export default ( app ) => {
    app
        .use( bodyparser() )
        .use( async ( ctx, next ) => {
            try {
                await next();
            } catch (err) {
                ctx.body = { message: err.message };
                ctx.status = err.status || 500;
            }
        })
}