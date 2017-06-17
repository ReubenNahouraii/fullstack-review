var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var Repo = require('./../database/index.js');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());


app.post('/repos/import', function (req, res) {


  var options = {
    uri: `https://api.github.com/users/${req.body.username}/repos`,
    headers: {
      'User-Agent': 'nubered',
      'Authorization': 'token cd151689da3066b341bc85f2f36c6b4172294141'
    }
  };

  console.log('request about to happen');
  request(options, function (error, response, body) {

    if(error) {
      console.log(error);
      res.status(500).end();
    } else {
      let parsedData = JSON.parse(body) || [];
      parsedData.forEach(({name, html_url, forks_url}) => {
        new Repo({name, html_url, forks_url}).save((err, repo) => {
          if(err) {
            console.log(err); //need to error handle better than this
          }
        });
      });
      res.status(201).end(JSON.stringify({}));
    }
  });
});

app.get('/repos', function (req, res) {
  console.log('we are in the repos');

  Repo.find(function (err, repo) {
    if (err) return console.error(err);
    res.status(200).end(JSON.stringify(repo));
  });
});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

