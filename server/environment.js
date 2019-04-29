const getMovieIDURL = function() {
  let titleURL = window.location.pathname.slice(2).slice(1).replace(/\/$/, "");
  console.log(`this is the title,`, titleURL);
  if (titleURL.length === 0) {
    console.log('invalid url was passed in');
    return "Optical_Bedfordshire";
  } else {
    return titleURL;
  }
}

const getEnvironment = function() {
  let service = {};
  console.log(`this is the environment: `, process.env.NODE_ENV);
 // if (process.env.NODE_ENV === 'production') {
    service = {
      scoreboard:'http://ec2-13-57-3-67.us-west-1.compute.amazonaws.com:9001',
      showtime: 'http://ec2-54-67-109-163.us-west-1.compute.amazonaws.com:9002',
      reviews:'http://ec2-35-165-132-177.us-west-2.compute.amazonaws.com:9003'
    }
 // } else {
 //   service = {
 //     scoreboard: 'http://localhost:9001',
 //     showtime:'http://localhost:9002',
 //     reviews: 'http://localhost:9003'
 //   }
 // }
  return service;
}

module.exports = {getMovieIDURL, getEnvironment};
