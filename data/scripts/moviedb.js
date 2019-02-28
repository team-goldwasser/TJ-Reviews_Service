const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs')
const API_KEY = require('../../config.js');

var currPage = 1;

function getTotalPages(callback) {
  var data = {};
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      page = JSON.parse(this.responseText).total_pages;
      if (callback) {
        callback(page);
      }
    }
  });
  xhr.open("GET", `https://api.themoviedb.org/3/movie/now_playing?language=en-US&api_key=${API_KEY.API}&region=US`);
  xhr.send(data);
}

function writeMovieData(page, callback) {
  var data = {};
  var allMovies = [];
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      // currPage = JSON.parse(this.responseText).page;
      JSON.parse(this.responseText).results.forEach( (movie) => {
        var movies = {};
        movies.id = movie.id;
        movies.title = movie.title;
        allMovies.push(movies);
      });
      callback(allMovies);
    }
  });
  while (currPage < page + 1) {
    console.log('currPage', currPage);
    xhr.open("GET", `https://api.themoviedb.org/3/movie/now_playing?language=en-US&api_key=${API_KEY.API}&language=en-US&page=${currPage}&region=US`, false);
    xhr.send(data);
    currPage++;
  }
  
}

getTotalPages((page) => {
  writeMovieData(page, (movies) => {
    console.log(movies);
    fs.writeFile('../movieTitleLegacy.json', JSON.stringify(movies, null, 2), 'utf-8', (err) => {
      if (err) {
        console.log('write file error', err);
      } else {
        console.log('file write success');
      }
    });
  });
});


