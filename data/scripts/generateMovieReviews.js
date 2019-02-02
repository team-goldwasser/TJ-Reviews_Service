// Generate movie reviews - 
//DONE   review VARCHAR(255),
//   user_id INT,
//   movie_id INT,
//DONE   stars INT,
//   created_at DATETIME,
//   not_interested TINYINT(1),
//   want_to_see_it TINYINT(1)

var fs = require('fs');
var catLoremIpsum = "Cat ipsum dolor sit amet, touch my tail, i shred your hand purrrr slap owner's face at 5am until human fills food dish. Purr while eating sit in box or steal the warm chair right after you get up damn that dog yet scamper annoy the old grumpy cat, start a fight and then retreat to wash when i lose stand in doorway, unwilling to chose whether to stay in or go out. Stare at owner accusingly then wink. Lick face hiss at owner, pee a lot, and meow repeatedly scratch at fence purrrrrr eat muffins and poutine until owner comes back meow all night having their mate disturbing sleeping humans but chase dog then run away yet white cat sleeps on a black shirt and attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; what's your problem? i meant to do that now i shall wash myself intently ooooh feather moving feather!.";
var loremArr = catLoremIpsum.split(' ');
var movieData = [];

fs.readFile('../movieIDTitle.json', 'utf-8', (err, data) => {
  if (err) {
    console.log("Error reading movie ID file", err);
  } else {
    var i = 0;
    var movies = JSON.parse(data);
    
    movies.forEach ( (movie) => {
      var movieReview = {};
      var offset = getRandomInt(10);
      movieReview.id = i;
      movieReview.user_id = getRandomUserID();
      movieReview.movie_id = movie.movie_id;
      movieReview.stars = getRandomStars();
      movieReview.review = getRandomReview(loremArr, offset);
      movieReview.createdAt = "";
      movieReview.not_interested = 0;
      movieReview.want_to_see_it = 0;
      i++;
      movieData.push(movieReview);
    });
    fs.writeFile('../movieReviews.json', JSON.stringify(movieData, null, 2), 'utf-8', (err) => {
      if (err) {
        console.log('Error writing movie reivews', err);
      }
    });
  }
});


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomReview(loremArr, offset) {
  const index = getRandomInt(loremArr.length - 1);
  if (index + offset < loremArr.length) {
    var review = loremArr.slice(0 + offset, index + offset).join(' ');
  } else {
    var review = loremArr.slice(0, index).join(' ');
  }
  return review;
}

function getRandomStars() {
  var randomStar = getRandomInt(5);
  var getHalf = getRandomInt(2);

  return (getHalf && randomStar <= 4) ? randomStar + 0.5 : randomStar
}

function getRandomUserID() {
  return getRandomInt(101);
}

module.exports.getRandomInt = getRandomInt;