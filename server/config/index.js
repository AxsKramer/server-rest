const { sign } = require('jsonwebtoken');

require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 4000,
  dbInit: process.env.DB_INIT,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  expToken: process.env.EXP_TOKEN,
  signwordToken: process.env.SIGN_TOKEN
};

module.exports = config;

