require('dotenv').config();

var config = {
  development: {
    host: process.env.DB_H,
    user: process.env.DB_U,
    password: process.env.DB_W,
    database: 'reviews',
    port: process.env.DB_P
  },
  UAT: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'UATreviews'
  },
  production: {
    host: process.env.DB_H,
    user: process.env.DB_U,
    password: process.env.DB_W,
    database: 'reviews',
    port: process.env.DB_P
  }
}

module.exports = config;
