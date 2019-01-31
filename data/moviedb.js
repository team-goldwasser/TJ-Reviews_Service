var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API_KEY = require('../config.js');

function getData() {
  var data = "{}";

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });
  xhr.open("GET", `https://api.themoviedb.org/3/movie/now_playing?language=en-US&api_key=${API_KEY.API}`);

  xhr.send(data);
}

getData();

