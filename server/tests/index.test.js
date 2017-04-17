import mongoose from 'mongoose'
import supertest from 'supertest'

import config from '../src/configs/server-config'
import m_User from '../src/models/m_User'
import app from '../src/app'

let server;
let request;

beforeAll(async () => {
    await mongoose.connect(config.getDatabaseHost());
    await clearDatabase();
    await createDatabase();
    server = await app.listen(config.getPort());
    request = await supertest(server);
});

afterAll(async () => {
    await clearDatabase();
});

describe('Koa tests', () => {
    test('GET/ users/ it must return datas', () => {
        // let data = config.getDefaultData();
        let toBeUsers = [
            {name: 'name1', password: 'password1', email: 'email1@gmail.com'},
            {name: 'name2', password: 'password2', email: 'email2@gmail.com'},
            {name: 'name3', password: 'password3', email: 'email3@gmail.com'},
            {name: 'name4', password: 'password4', email: 'email4@gmail.com'},
            {name: 'name5', password: 'password5', email: 'email5@gmail.com'}
        ];
        request
            .get('/users')
            .expect(200)
            .then( res => {
                const { users } = res.body;
                console.log('users: ', users);
                expect( users ).toContain( toBeUsers );
            });
    });

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
