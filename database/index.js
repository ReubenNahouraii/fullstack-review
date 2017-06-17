var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connected');
});

var repoSchema = mongoose.Schema({
  name: String,
  html_url: String,
  forks_count: Number
});

var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;