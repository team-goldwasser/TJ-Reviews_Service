const { Pool } = require('pg');
var env = process.env.NODE_ENV || 'development';
var db = require('./config')[env];

const pool = new Pool({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.database,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

pool.connect(function(err) {
  if (err) {
     console.log('Error acquiring client', err.stack);
  } 
  console.log('connected to DB');
});

var getAudienceReview = function(id, callback) {
  pool.query(`SELECT id, users.username, review, stars FROM audience_reviews \
  INNER JOIN users ON users.user_id = audience_reviews.user_id 
  AND movie_id=${id} LIMIT 4;`, (err, results) => {
    if (err) {
      console.log("Error getting reviews", err);
    } else {
      callback(null, results);
    }
  });
}

var getAudienceScoreboard = function(id, callback) {
  pool.query(`SELECT AVG(stars) as averageRating, COUNT(review) as userRatings, \
  ((SELECT COUNT(liked) FROM audience_reviews WHERE liked=1 AND movie_id=${id}) / COUNT(review) * 100) as audienceScore 
  \ FROM audience_reviews where movie_id=${id};`, (err, results) => {
    if (err) {
      console.log('Error getting reviews', err);
    } else {
      callback(null, results);
    }
  })
}

module.exports = {getAudienceReview, getAudienceScoreboard, pool};