import m_Users from '../models/m_User'
import config from '../configs/server-config'

exports.getUserByName = async (username) => {
    let data = config.defaultData();

    m_Users.find({name: username}, await function(err, user) {
        data.user = user;
    });
};
