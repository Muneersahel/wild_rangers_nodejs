const dotenv = require('dotenv');
dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const HOST = process.env.DB_HOST;

const PORT = process.env.PORT;

const SECRET_KEY = process.env.SECRET_KEY;

const BCRYPT_SALT = process.env.BCRYPT_SALT;

const NODE_ENV = process.env.NODE_ENV || 'production';

const TELERIVET_API_KEY = process.env.TELERIVET_API_KEY;
const TELERIVET_PROJECT_ID = process.env.TELERIVET_PROJECT_ID;
const TELERIVET_DATA_TABLE_ID = process.env.TELERIVET_DATA_TABLE_ID;

exports.config = {
    db: {
        name: DB_NAME,
        user: DB_USER,
        pass: DB_PASS,
        host: HOST,
    },
    server: {
        port: PORT,
        host: HOST,
    },
    secretKey: SECRET_KEY,
    bcrypt: {
        salt: BCRYPT_SALT,
    },
    nodeEnv: NODE_ENV,
    telerivet: {
        apiKey: TELERIVET_API_KEY,
        projectId: TELERIVET_PROJECT_ID,
        dataTableId: TELERIVET_DATA_TABLE_ID,
    },
};
