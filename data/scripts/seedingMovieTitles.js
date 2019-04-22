const faker = require('faker');
const fs = require('fs');
const csv = require('fast-csv');
const ws = fs.createWriteStream(`data/seed_files/movieTitles.csv`);

const recordCount = 250000;
const movieTitles = [];
let id = 1;
faker.seed(250000);

//helper function
const randomizer = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }

const wordCapitalizer = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
} 

//main script
const chunkGen = (recordCount) => {
    while (id < recordCount || id === recordCount) {
        let movie = {};
        var titles = faker.random.words(randomizer(1,3)).split(' ');
        var convertedTitle = titles.map(title => wordCapitalizer(title));

        movie.movie_id = id;
        movie.title = convertedTitle.join(' ');
        movie.title_url = convertedTitle.join('_');
        movieTitles.push(movie);
        id++;
    }
}

chunkGen(recordCount);

csv.write( movieTitles, {headers: true})
    .pipe(ws);