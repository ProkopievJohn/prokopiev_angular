import m_Users from '../models/m_User'
import config from '../configs/server-config'

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
            mail: usermail
        },
        update = {
            name: username,
            password: userpass,
            mail: usermail
        },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };

    let a = await m_Users.findOneAndUpdate(query, update, options, (error, user) => {
        console.log('user: ', user);
        return user;
    });

};
