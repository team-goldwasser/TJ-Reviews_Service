var config = {
  development: {
    host: 'localhost',
    user: 'root',
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
    host: '192.168.99.100',
    port: '3306',
    user: 'root',
    password: 'Password1',
    database: 'reviews'
  }
}

module.exports = config;