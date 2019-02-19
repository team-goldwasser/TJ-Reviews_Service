var mysql = require('mysql');
var env = process.env.NODE_ENV || 'UAT';
var db = require('../../server/database/config')[env];
var connection = mysql.createConnection(db);

connection.connect(function(err) {
  if (err) {
    console.log(err);
  }
});

afterAll( () => {
  connection.end();
});

describe("it should return an empty array when querying empty tables", () => {
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
});

describe("it should successfully insert rows into tables", () => {
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
});

describe("it should successfully retrieve values that were inserted previously", () => {
  test('Retrieve a row from users table', () => {
    connection.query("SELECT * FROM users WHERE user_id='1';", (err, results) => {
      if (err) {
        throw err;
      }
      expect((results[0].username)).toBe("Best Reviewer");
    });
  });

  test('Retrieve a row from audience_reviews table', () => {
    connection.query("SELECT * FROM audience_reviews WHERE id='1';", (err, results) => {
      if (err) {
        throw err;
      }
      expect(results[0].review).toBe('Spiderman was the best');
    });
  });
});

