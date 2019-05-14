var redis = require('redis');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./database/helper.js');
var cors = require('cors');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.options('*', cors());

var client = redis.createClient(6379,'34.216.231.98');

client.on('connect', () => {
  console.log('Redis client connected');
});

client.on("error", function (err) {
    console.log("Error " + err);
});

// read functions
app.get('/reviews/audience/:title', (req, res) => {

  var urlKey= req.originalUrl;
  console.log(urlKey);

  client.get(urlKey, (err, cache) => {
    if (err) {
      console.log('Cannot pull from the cache');
    }

    if (cache) {
      console.log('This is the cache:', cache);
      res.status(200).json(JSON.parse(cache));
    } else {
      db.getAudienceReview(req.params.title, (err, results) => {
        if (err) {
          throw err;
        } else {
          client.set(urlKey, JSON.stringify(results))
          res.status(200).json(results);
        }
      });
    }
  });
});

// app.get('/reviews/audience/:title', (req, res) => {
//   db.getAudienceReview(req.params.title, (err, results) => {
//     if (err) {
//       throw err;
//     } else {
//       // res.send(JSON.stringify(results, null, 2));
//       res.status(200).json(results);
//     }
//   });
// });

app.get('/reviews/scoreboard/:title', (req, res) => {
  db.getAudienceScoreboard(req.params.title, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.send(JSON.stringify(results, null, 2));
    }
  });
});

app.get('/m/movieinfo/:title', (req, res) => {
  db.getMovietitle(req.params.title, (err, results) => {
    if (err) {
      throw err;
    } else {
      // res.send(JSON.stringify(results, null, 2));
      res.status(200).json(results);
    }
  });
});

// write functions
app.post('/reviews/audience/:title', (req, res) => {
  db.postNewReview(req.body, (err, results) => {
    if (err) {
      throw err;
    } else {
      // res.send(JSON.stringify(results, null, 2));
      res.status(201).json(results);
    }
  });
})

// update functions
// movie title patch
app.patch('/reviews/audience/:title', (req, res) => {
  db.updateReview(req.body, (err, results) => {
    if (err) {
      throw err;
    } else {
      // res.send(JSON.stringify(results, null, 2));
      res.status(202).json(results);
    }
  });
})

// delete functions
// app.delete()
app.delete('/reviews/audience/:title', (req, res) => {
  db.deleteReview(req.body, (err, results) => {
    if (err) {
      throw err;
    } else {
      // res.send(JSON.stringify(results, null, 2));
      res.status(202).json(results);
    }
  });
})

let port = process.env.PORT || 9003;

var server = app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

module.exports = {server};

