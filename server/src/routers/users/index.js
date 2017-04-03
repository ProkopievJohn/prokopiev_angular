import router from '../router'
import s_User from '../../service/s_User'

import opt from '../options'

router.prefix( opt.user.prefix );

router.get('/', async (ctx, next) => {
    try {
        // console.log('s_User: ', s_User);
        await s_User.getUserByName('name', (err, data) => {
            console.log(data)
            ctx.body = 'data';
            next();
        })
    } catch (err) {
        console.log('err: ', err);
        ctx.body.getUsers = err.message
    }
})

export default router;
