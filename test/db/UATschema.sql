DROP DATABASE IF EXISTS UATreviews;
CREATE DATABASE UATreviews;

USE UATreviews;

CREATE TABLE audience_reviews (
  id INT NOT NULL,
  review VARCHAR(1000),
  user_id INT,
  movie_id INT,
  stars INT,
  created_at DATETIME,
  not_interested TINYINT(1),
  want_to_see_it TINYINT(1),
  liked TINYINT(1),
  PRIMARY KEY (id)
)ENGINE=MEMORY DEFAULT CHARSET=utf8;

CREATE TABLE users (
  user_id INT NOT NULL,
  username VARCHAR(30),
  has_profile_pic TINYINT(1),
  etag varchar(255),
  objectURL varchar(255),
  PRIMARY KEY(user_id),
  UNIQUE KEY(username)
)ENGINE=MEMORY ;
