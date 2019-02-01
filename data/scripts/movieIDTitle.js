const fs = require('fs');

fs.readFile('../movies.csv', 'utf-8', (err, data) => {
  if (err) {
    console.log('reading file error', err);
  } else {
    var allMovies = [];
    var csvArr = data.split('\n');
    csvArr.forEach( (lines) => {
      var csvRow = lines.split(',');
      var movies = {};
      if (csvRow[0] && csvRow[1] && csvRow[2]) {
        movies.movie_id = csvRow[0];
        movies.movie_title = csvRow[1].replace(/['"]+/g, '');
        movies.title_url = csvRow[2];
        allMovies.push(movies);
      }
      
      fs.writeFile('../movieIDTitle.json', JSON.stringify(allMovies, null, 2),'utf-8', (err) => {
        if (err) {
          console.log('error writing movie json file', err);
        }
      });
    });
  }

  
});