var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reviews'
});

connection.connect(function(err) {
  if (err) {
     console.log(err);
  }
  // console.log("Connected to db");
});

module.exports = connection;