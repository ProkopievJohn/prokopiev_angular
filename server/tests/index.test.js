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
    test('GET/ users/ it must return datas', async () => {
        await request
            .get('/users')
            .expect(200)
            .then( res => {
                const { users } = res.body;
                users.map(user => {
                    delete user.__v;
                    delete user._id;
                    return user;
                })
                expect( users ).toEqual( expect.arrayContaining( startUsersList ));
            });
    });

    test('POST/ user/ it must create user', async () => {
        await request
            .post('/users/new')
            .send( newUser )
            .expect(302)
            .expect('Location', /\/home/)
            .then( res => {
                const { user } = res.body;
                expect( user ).toEqual( expect.objectContaining( newUser ));
            });
    });
});

const clearDatabase = async () => {
    await m_User.remove({});
};

const createDatabase = async () => {
    await m_User.create(startUsersList);
};

const startUsersList = [
    {name: 'name1', password: 'password1', email: 'email1@gmail.com'},
    {name: 'name2', password: 'password2', email: 'email2@gmail.com'},
    {name: 'name3', password: 'password3', email: 'email3@gmail.com'}
];

const newUser = {name: 'name4', password: 'password4', email: 'email4@gmail.com'};
