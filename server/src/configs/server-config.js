const conf = {
    port: 3000,
    host: "localhost",

    databaseHost: 'mongodb://localhost:27017/prokopiev_angular',

    defaultData() {
        return {
            errors: [],
            messages: [],
            info: []
        }
    }
};

export default conf;