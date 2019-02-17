const mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'localhost',
  user: 'root',
  password:'',
  database: 'UATreviews'
});

afterAll( () => {
  connection.end();
});

test('Expect UAT db users table to be empty', () => {
  connection.query('SELECT * FROM users;', (err, results) => {
    if (err) {
      throw err;
    }
    expect(results).toBeTruthy();
  });
});

test('Expect UAT db audience_reviews table to be empty', () => {
  connection.query('SELECT * FROM audience_reviews;', (err, results) => {
    if (err) {
      throw err;
    }
    expect(results).toBeTruthy();
  });
});

test('Insert a row into users table', () => {
  connection.query("INSERT INTO users VALUES (1, 'Best Reviewer', 0, NULL, NULL)", (err, results) => {
    if (err) {
      throw err;
    }
    expect(results.insertId).toBe(0);
  });
});

test('Insert a row into audience_reviews table', () => {
  connection.query("INSERT INTO audience_reviews VALUES (1, 'Spiderman was the best', 1, 4098, 4.5, now(), NULL, NULL, 1);", (err, results) => {
    if (err) {
      throw err;
    }
    expect(results.insertId).toBe(0);
  });
});

test('Delete a row from users table', () => {
  connection.query("DELETE FROM users WHERE user_id='1';", (err, results) => {
    if (err) {
      throw err;
    }
    expect(results.affectedRows).toBe(1);
  });
});

test('Delete a row from audience_reviews table', () => {
  connection.query("DELETE FROM audience_reviews WHERE id='1';", (err, results) => {
    if (err) {
      throw err;
    }
    expect(results.affectedRows).toBe(1);
  });
});





