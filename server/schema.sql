-- DROP DATABASE reviews;
CREATE DATABASE reviews;

USE reviews;

CREATE TABLE audience_reviews (
  id INT NOT NULL AUTO_INCREMENT,
  review VARCHAR(255),
  user_id INT,
  movie_id INT,
  stars INT,
  created_at DATETIME,
  not_interested TINYINT(1),
  want_to_see_it TINYINT(1),
  PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE users (
  user_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(30),
  has_profile_pic TINYINT(1),
  etag varchar(255),
  objectURL varchar(255),
  PRIMARY KEY(user_id),
  UNIQUE KEY(username)
) AUTO_INCREMENT = 1;

CREATE TABLE movies (
  movie_id INT NOT NULL AUTO_INCREMENT,
  movie_title VARCHAR(50),
  PRIMARY KEY(movie_id)
) AUTO_INCREMENT = 1;