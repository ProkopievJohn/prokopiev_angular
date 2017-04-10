class Config {
    constructor() {}

    getPort() {
        return process.env.PORT || 4000;
    }

    getHost() {
        return process.env.HOST || 'localhost';
    }

    getDatabaseHost() {
        return process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017/test' : 'mongodb://localhost:27017/prokopiev_angular';
    }

    getDefaultData() {
        return {
            errors: [],
            messages: [],
            info: []
        }
    }
};

export default new Config();