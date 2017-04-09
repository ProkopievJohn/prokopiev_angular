import m_Users from '../models/m_User'
import config from '../configs/server-config'

export const getAllUsers = async () => {
    let data = config.defaultData();

    try {
        let users = await m_Users.find({}).lean().exec();

        data.users = users;
    } catch (err) {
        console.log('error in user service: ', err);
        data.errors.push('Can not find users');
    }
};

export const getUserByName = async (username) => {
    let data = config.defaultData();

    try {
        let user = await m_Users.findOne({name: username}).lean().exec();

        data.user = user;
    } catch (err) {
        console.log('error in user service: ', err);
        data.errors.push('Can not find user with name = ' + username);
    }
    return data;
};

export const createUser = async (username, userpass, usermail) => {
    let query = {
            name: username,
            password: userpass,
            email: usermail
        },
        data = config.defaultData();
    
    try {
        let user = await m_Users.create(query);

        data.user = user;
    } catch (err) {
        console.log('error in create user: ', err);
        data.errors.push('Can not create user with: name = ' + username + ' or/and email = ' + usermail)
    }
    return data;
};
