var express = require('express');
var db = require('../server/database/config.js');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/reviews/audience/:title', (req, res) => {
  console.log("Connected to db");
  db.query(`SELECT id, users.username, review, stars FROM audience_reviews \
  INNER JOIN users ON users.user_id = audience_reviews.user_id 
  AND movie_id=${req.params.title} LIMIT 4;`, (err, results) => {
    if (err) {
      console.log("Error getting reviews", err);
    } else {
      res.send(JSON.stringify(results, null, 2));
    } 
  });
});

app.get('/reviews/scoreboard/:title', (req, res) => {
  db.query(`SELECT * FROM audience_reviews where movie_id=${req.params.title};`, (err, results) => {
    if (err) {
      console.log('Error getting reviews', err);
    } else {
      var reviewCount = 0;
      var rating = 0;
      var liked = 0;
      results.forEach( (movie) => {
        reviewCount += 1;
        rating += movie.stars;
        liked += movie.liked;
      });
      console.log('Number of reviews', reviewCount);
      console.log('stars', rating/reviewCount);
      console.log('% liked: ', liked/reviewCount);

      var scoreboard = {};
      scoreboard.audienceScore = (liked/reviewCount*100).toFixed(0);
      scoreboard.averageRating = (rating/reviewCount).toFixed(1);
      scoreboard.userRatings = reviewCount;
      res.send(scoreboard);
    }
  })
});

let port = process.env.PORT || 9003;

var server = app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

module.exports = {server, db};