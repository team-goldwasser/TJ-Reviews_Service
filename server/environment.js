const getMovieIDURL = function() {
  let titleURL = window.location.pathname.slice(2).slice(1);
  if (titleURL.length === 0) {
    console.log('invalid url was passed in');
    return "black_panther";
  } else {
    return titleURL;
  }
}

const getEnvironment = function() {
  let service = {};
  if (process.env.NODE_ENV === 'production') {
    service = {
      scoreboard:'http://localhost:9001',
      showtime: 'http://localhost:9002',
      reviews:'http://localhost:9003'
    }
  } else {
    service = {
      scoreboard: 'http://localhost:9001',
      showtime:'http://localhost:9002',
      reviews: 'http://localhost:9003'
    }
  }
  return service;
}

module.exports = {getMovieIDURL, getEnvironment};