# rottenTomatoesReviews
Rotten Tomatoes User Reviews

#Path and Description
<!-- LEGACY -->
<!-- /data/scripts/moviedb.js
Script to grab movie ID and title from movieDB API -->

/data/scripts/movieIDTitle.js
Script to convert csv to json using node(fs), callbacks
csv is provided by movieservice (Chris called movies.csv)

TODO:
Generate users - 
  username VARCHAR(30),
  has_profile_pic TINYINT(1),
  etag varchar(255),
  objectURL

Generate movie reviews - 
  review VARCHAR(255),
  user_id INT,
  movie_id INT,
  stars INT,
  created_at DATETIME,
  not_interested TINYINT(1),
  want_to_see_it TINYINT(1),

/server/database/index.js
Used to populate mysql db
Read from JSON files of movieIDTitle.json and user.json

/server/database/config.js
module.exports for REST API in app.js

server/app.js
Contains RESTful for:
  GET:
  /reviews/audience/:title
  /reviews/scoreboard/:title

  STRETCH:
  POST: /reviews/audience/:title/:user

  

