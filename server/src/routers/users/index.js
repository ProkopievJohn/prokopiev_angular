import router from '../router'
import { getAllUsers, getUserByName, createUser } from '../../service/s_User'
import config from '../../configs/server-config'

import opt from '../options'

router.prefix( opt.user.prefix );

router.get('/', async (ctx, next) => {
    try {
        let users = await getAllUsers();
        ctx.body = users;
    } catch (err) {
        console.log('error in user router /get: ', err);
        
        let data = config.defaultData();
        data.errors.push('Server error');
        ctx.status = 500;
        ctx.data = data;
    }
});

router.get('/:name', async (ctx, next) => {
    const { name } = ctx.params;

    try {
        let user = await getUserByName(name);
        ctx.body = user;
    } catch (err) {
        console.log('error in user router /get/:name: ', err);

        let data = config.defaultData();
        data.errors.push('Server error');
        ctx.status = 500;
        ctx.data = data;
    }
});

router.post('/new', async (ctx, next) => {
    const {
        name,
        password,
        email
    } = ctx.request.body;

    try {
        let user = await createUser(name, password, email);
        ctx.body = user;
    } catch (err) {
        console.log('error in user router /post/new: ', err);

        let data = config.defaultData();
        data.errors.push('Server error');
        ctx.status = 500;
        ctx.data = data;
    }
});

export default router;
