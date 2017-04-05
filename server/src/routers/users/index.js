import router from '../router'
import { getUserByName, createUser } from '../../service/s_User'

import opt from '../options'

router.prefix( opt.user.prefix );

router.get('/', async (ctx, next) => {
    try {
        let user = await getUserByName('my name1');
        ctx.body = user;
    } catch (err) {
        console.log('error in user router: ', err);

        let data = config.defaultData();

        data.errors.push('Can not find user with name = ' + ctx.request.username);

        ctx.body = data;
    }
})

export default router;
