const request = require('supertest');
const app = require('../../server/app.js');

afterEach( () => {
  app.server.close();
});

afterAll( () => {
  app.connection.end();
});

describe("it should successfully insert multiple records into tables", () => {
  test('Insert rows into audience_reviews table', () => {
    app.connection.query("INSERT INTO audience_reviews VALUES (2, 'Wow, did you know kingpin was modelled after daredevils', 3, 204098, 3.5, now(), NULL, NULL, 0), (3, 'Love Hailey Steinfeld!', 2, 204098, 5, now(), NULL, NULL, 1);", (err, results) => {
      if (err) {
        throw err;
      }
      expect(results.affectedRows).toBe(2);
    });
  });
  test('Insert rows into users table', () => {
    app.connection.query("INSERT INTO users VALUES (2, 'Bob', 0, NULL, NULL), (3, 'Alice', 0, NULL, NULL);", (err, results) => {
      if (err) {
        throw err;
      }
      expect(results.affectedRows).toBe(2);
    });
  });
});

describe("Testing Get for '/'", () => {
  test('It should respond with a status code of 200', () => {
    return request(app.server).get('/').then( (response) => {
      expect(response.status).toEqual(200);
    });
  });
  test('It should respond with a content type of text/html', () => {
    return request(app.server).get('/').then( (response) => {
      expect(response.header["content-type"]).toEqual('text/html; charset=UTF-8');
    });
  });
});

describe("Testing Get for '/reviews/audience/:title'", () => {
  test('It should respond with a status code of 200', () => {
    return request(app.server).get('/reviews/audience/204098').then( (response) => {
      expect(response.status).toEqual(200);
    });
  });
  test('It should return two reviews', () => {
    return request(app.server).get('/reviews/audience/204098').then( (response) => {
      var audienceReview = JSON.parse(response.text);
      expect(audienceReview.length).toEqual(2);
    });
  });
  test('It should respond with a empty object when passed in invalid title id', () => {
    return request(app.server).get('/reviews/audience/999999').then( (response) => {
      var audienceReview = JSON.parse(response.text);
      expect(audienceReview).toEqual([]);
    });
  });
});

describe("Testing Get for '/reviews/scoreboard/:title'", () => {
  test('It should respond with a status code of 200', () => {
    return request(app.server).get('/reviews/scoreboard/204098').then( (response) => {
      expect(response.status).toEqual(200);
    });
  });
  test('It should return four reviews', () => {
    return request(app.server).get('/reviews/scoreboard/204098').then( (response) => {
      var audienceReview = JSON.parse(response.text);
      expect(audienceReview.audienceScore).toEqual("50");
      expect(audienceReview.averageRating).toEqual("4.3");
      expect(audienceReview.userRatings).toEqual(2);
    });
  });
  test('It should respond with a empty object when passed in invalid title id', () => {
    return request(app.server).get('/reviews/audience/999999').then( (response) => {
      var audienceReview = JSON.parse(response.text);
      expect(audienceReview).toEqual([]);
    });
  });
});