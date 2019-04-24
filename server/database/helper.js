const { Pool } = require('pg');
const faker = require('faker');
const randomizer = require('../../data/scripts/seedingMovieReviews.js');
const env = process.env.NODE_ENV || 'development';
const db = require('./config')[env];


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

// READ functions
var getAudienceReview = function(id, callback) {
  var sql = `SELECT movie_id, users.username, review, stars FROM audience_reviews
  LEFT JOIN users ON users.user_id = audience_reviews.user_id 
  AND movie_id=${id} FETCH FIRST 4 ROWS ONLY;`;

  pool.query(sql, (err, results) => {
    if (err) {
      console.log("Error getting reviews", err);
    } else {
      console.log(results);
      callback(null, results.rows);
    }
  });
}

var getAudienceScoreboard = function(id, callback) {
  var sql = `SELECT AVG(stars) as averageRating, COUNT(review) as userRatings,
  ((SELECT COUNT(liked) FROM audience_reviews WHERE liked=1 AND movie_id=${id}) COUNT(review) * 100) as audienceScore 
  FROM audience_reviews where movie_id=$1;`;

  pool.query(sql,[id], (err, results) => {
    if (err) {
      console.log('Error getting reviews', err);
    } else {
      callback(null, results);
    }
  })
}

var getMovietitle = function(url, callback) {
  var sql = `SELECT movie_id, title, title_url FROM movies WHERE title_url = $1 LIMIT 1; `;
  pool.query(sql, [url], (err, results) => {
    if (err) {
      console.log('Error getting movie titles', err);
    } else {
      callback(null, results.rows[0]);
    }
  })
}

// WRITE functions

// Post review into database
const postNewReview = (request, callback) => {
  var sql = `INSERT INTO audience_reviews (user_id, movie_id, stars, review, created_at, not_interested, want_to_see_it, liked)  
      VALUES ($1, $2, $3, $4, DEFAULT, $5, $6, $7);`;

  pool.query(sql, [request.user_id, request.movie_id, request.stars, request.review, request.not_interested, request.want_to_see_it, request.liked], (err, results) => {
      if (err) {
        console.log('Error inserting new audience review', err);
        throw err
      } else {
        callback(null, results.rows);
      }
    })
}

// UPDATE functions
const updateReview = (request, callback) => {
  var sql = `UPDATE audience_reviews SET review = $1 WHERE user_id = $2 AND movie_id = $3`;

  pool.query(sql, [request.review, request.user_id, request.movie_id, ], (err, results) => {
      if (err) {
        console.log('Error inserting new audience review', err);
        throw err
      } else {
        callback(null, results.rows);
      }
    })
}


// DELETE functions

const deleteReview = (request, callback) => {
  var sql = `DELETE FROM audience_reviews WHERE user_id = $1 AND movie_id = $2`;

  pool.query(sql, [request.user_id, request.movie_id], (err, results) => {
      if (err) {
        console.log('Error inserting new audience review', err);
        throw err
      } else {
        callback(null, results.rows);
      }
    })
}

//Helper functions

module.exports = {getAudienceReview, getAudienceScoreboard, getMovietitle, postNewReview, updateReview, deleteReview, pool};








