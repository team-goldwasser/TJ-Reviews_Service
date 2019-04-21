const faker = require('faker');
const fs = require('fs');
const csv = require('fast-csv');
const randomizer = require('./seedingMovieReviews.js')
const ws = fs.createWriteStream(`data/seed_files/users.csv`);

const recordCount = 250000;
const userData = [];
let id = 1;
faker.seed(250000);

//main script
const chunkGen = (recordCount) => {
    while (id < recordCount || id === recordCount) {
        var user = {};
        user.user_id = id;
        user.username = faker.internet.userName();
        user.has_profile_pic = randomizer.getRandomInt(2);
        user.etag = "";
        user.objectURL = faker.internet.avatar();
        userData.push(user);
        id++;
    }
}

chunkGen(recordCount);

csv.write( userData, {headers: true})
    .pipe(ws);


