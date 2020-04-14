const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public'),
    database: 'mongodb://localhost/instagram',
    databaseOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    facebook: {
        appId: '1014767002253072',
        appSecret: 'e17da5f1508facf4d3cbcb946cae21b1'
    }
};