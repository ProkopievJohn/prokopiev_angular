import config from '../src/configs/server-config'
import mongoose from 'mongoose'
import m_User from '../src/models/m_User'
import app from '../src/index'
import request from './request'

beforeAll(async () => {
    // await mongoose.connect(config.getDatabaseHost());
    await app();
    await clearDatabase();
    await createDatabase();
});

// afterAll(async () => {
//     await clearDatabase();
// });

describe('it must connect to server', () => {
    test('test', async () => {
        // console.log('request): ', request('/users', 'GET').resolves);
        // await expect();
        await expect( request('/users', 'GET')).resolves.toBe('peanut butter');
    })
});



const clearDatabase = async () => {
    await m_User.remove({});
};

const createDatabase = async () => {
    const array = [
        {name: 'name1', password: 'password1', email: 'email1@gmail.com'},
        {name: 'name2', password: 'password2', email: 'email2@gmail.com'},
        {name: 'name3', password: 'password3', email: 'email3@gmail.com'},
        {name: 'name4', password: 'password4', email: 'email4@gmail.com'},
        {name: 'name5', password: 'password5', email: 'email5@gmail.com'}
    ];
    await m_User.create(array);
};
