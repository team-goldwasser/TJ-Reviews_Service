const faker = require('faker');
const fs = require('fs');
const csv = require('fast-csv');

var records = 2000000;
var chunksize = 2000000;
var userCount = 250000;
var transfers = 5;
var counter = 1;
var fileCounter = 1;
faker.seed(2000000);
let movies = [];

//helper functions
function getRandomStars() {
    var randomStar = getRandomInt(5);
    var getHalf = getRandomInt(2);
  
    return (getHalf && randomStar <= 4) ? randomStar + 0.5 : randomStar
  }

  const getRandomInt = (integer) => {
    return Math.floor(Math.random() * Math.floor(integer))
  }

//main scripts
const chunkGen = (recordCount) => {
   
    let ws = fs.createWriteStream(`data/seed_files/newReviews_${fileCounter}.csv`);

    while (recordCount > 0) {
        let movieReview = {
            user_id : getRandomInt(userCount),
            movie_id : getRandomInt(userCount),
            stars : getRandomStars(),
            review : faker.lorem.sentences(3),
            createdAt : "",
            not_interested : 0,
            want_to_see_it : 0,
            liked : getRandomInt(2)
       
        }
        movies.push(movieReview);
        recordCount--;
        counter++;
    }
    
    csv.write( movies, {headers: true})
        .pipe(ws);
    fileCounter++;
    movies = [];

};

chunkGen(chunksize);


// var stream = client.query(copyFrom(`COPY ${criticTable} (top_critic, name, img_url, organization) FROM STDIN CSV HEADER`)); var fileStream = fs.createReadStream(criticInput);



module.exports.getRandomInt = getRandomInt;