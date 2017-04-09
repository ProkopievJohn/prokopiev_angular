const conf = {
    port: process.env.PORT || 4000,
    host: process.env.HOST || 'localhost',

    databaseHost: process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017/test' : 'mongodb://localhost:27017/prokopiev_angular',

    defaultData() {
        return {
            errors: [],
            messages: [],
            info: []
        }
    }
};

export default conf;