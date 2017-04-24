import router from '../routers'
import bodyParser from 'koa-bodyparser'

export default ( app ) => {
    app.use( bodyParser() )
        .use( router.routes() )
        .use( router.allowedMethods() );
};
