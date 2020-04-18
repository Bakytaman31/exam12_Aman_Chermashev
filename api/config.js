const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public'),
    database: 'mongodb://localhost/gallery',
    databaseOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    facebook: {
        appId: '558927151409025',
        appSecret: '04c66e8a0e5d19646f9ff2969c3e23b3'
    }
};