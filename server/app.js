var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./database/helper.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/reviews/audience/:title', (req, res) => {
  db.getAudienceReview(req.params.title, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.send(JSON.stringify(results, null, 2));
    }
  });
});

app.get('/reviews/scoreboard/:title', (req, res) => {
  db.getAudienceScoreboard(req.params.title, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.send(JSON.stringify(results, null, 2));
    }
  });
  //scoreboard.audienceScore = (liked/reviewCount*100).toFixed(0);
});

let port = process.env.PORT || 9003;

var server = app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

module.exports = {server};