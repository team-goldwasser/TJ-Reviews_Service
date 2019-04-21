var config = {
  development: {
    host: 'localhost',
    user: 'admin',
    password: '',
    database: 'reviews'
  },
  UAT: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'UATreviews'
  },
  production: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'reviews'
  }
}

module.exports = config;