const request = require('supertest');
const app = require('../../server/app.js');

afterEach( () => {
  app.server.close();
});

afterAll( () => {
  app.db.end();
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
    return request(app.server).get('/reviews/audience/284054').then( (response) => {
      expect(response.status).toEqual(200);
    });
  });
  test('It should return four reviews', () => {
    return request(app.server).get('/reviews/audience/284054').then( (response) => {
      var audienceReview = JSON.parse(response.text);
      expect(audienceReview.length).toEqual(4);
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
    return request(app.server).get('/reviews/scoreboard/284054').then( (response) => {
      expect(response.status).toEqual(200);
    });
  });
  test('It should return four reviews', () => {
    return request(app.server).get('/reviews/scoreboard/284054').then( (response) => {
      var audienceReview = JSON.parse(response.text);
      expect(audienceReview.audienceScore).toEqual("71");
      expect(audienceReview.averageRating).toEqual("2.7");
      expect(audienceReview.userRatings).toEqual(7);
    });
  });
  test('It should respond with a empty object when passed in invalid title id', () => {
    return request(app.server).get('/reviews/audience/999999').then( (response) => {
      var audienceReview = JSON.parse(response.text);
      expect(audienceReview).toEqual([]);
    });
  });
});