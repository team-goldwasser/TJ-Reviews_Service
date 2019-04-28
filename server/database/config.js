require('dotenv').config();

var config = {
  development: {
    host: process.env.db_h,
    user: process.env.db_u,
    password: process.env.db_w,
    database: 'reviews',
    port: process.env.db_p
  },
  UAT: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'UATreviews'
  },
  production: {
    host: process.env.db_h,
    user: process.env.db_u,
    password: process.env.db_w,
    database: 'reviews',
    port: process.env.db_p
  }
}

module.exports = config;