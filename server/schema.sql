DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;

\connect reviews;

CREATE TABLE audience_reviews (
  id serial PRIMARY KEY,
  user_id INT,
  movie_id INT,
  stars NUMERIC,
  review VARCHAR(1000),
  created_at TIMESTAMP WITH TIME ZONE,
  not_interested SMALLINT,
  want_to_see_it SMALLINT,
  liked SMALLINT
);

CREATE TABLE users (
  user_id INT NOT NULL PRIMARY KEY UNIQUE,
  username VARCHAR(30),
  has_profile_pic SMALLINT,
  etag varchar(255),
  objectURL varchar(255)
);

COPY audience_reviews(user_id, movie_id, stars, review, created_at, not_interested, want_to_see_it, liked) FROM '/Users/soupuu/Desktop/RPT11/SDC/Project_Repos/TJ-Reviews_Service/data/seed_files/newReviews_5.csv' DELIMITER ',' CSV HEADER;
COPY audience_reviews(user_id, movie_id, stars, review, created_at, not_interested, want_to_see_it, liked) FROM '/Users/soupuu/Desktop/RPT11/SDC/Project_Repos/TJ-Reviews_Service/data/seed_files/newReviews_4.csv' DELIMITER ',' CSV HEADER;
COPY audience_reviews(user_id, movie_id, stars, review, created_at, not_interested, want_to_see_it, liked) FROM '/Users/soupuu/Desktop/RPT11/SDC/Project_Repos/TJ-Reviews_Service/data/seed_files/newReviews_3.csv' DELIMITER ',' CSV HEADER;
COPY audience_reviews(user_id, movie_id, stars, review, created_at, not_interested, want_to_see_it, liked) FROM '/Users/soupuu/Desktop/RPT11/SDC/Project_Repos/TJ-Reviews_Service/data/seed_files/newReviews_2.csv' DELIMITER ',' CSV HEADER;
COPY audience_reviews(user_id, movie_id, stars, review, created_at, not_interested, want_to_see_it, liked) FROM '/Users/soupuu/Desktop/RPT11/SDC/Project_Repos/TJ-Reviews_Service/data/seed_files/newReviews_1.csv' DELIMITER ',' CSV HEADER;
COPY users(user_id, username, has_profile_pic, etag, objectURL) FROM '/Users/soupuu/Desktop/RPT11/SDC/Project_Repos/TJ-Reviews_Service/data/seed_files/users.csv' DELIMITER ',' CSV HEADER;

-- CREATE TABLE movies (
--   movie_id INT NOT NULL,
--   movie_title VARCHAR(50),
--   title_url VARCHAR(50),
--   PRIMARY KEY(movie_id)
-- );