const connectToMongo = require("./connectdb");

var express = require('express');
var cors = require('cors');

connectToMongo();

var app = express();
const port = process.env.PORT||5000;

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.static(__dirname + '/public'));

// use res.render to load up an ejs view file

app.use("/api/list", require("./routes/list"));

// index page
app.get('/', function(req, res) {
  var mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
  ];
  var tagline = "No programming concept is complete without a cute animal mascot.";

  res.render('pages/index', {
    mascots: mascots,
    tagline: tagline
  });
});

app.listen(port);
console.log(`Server is listening on port ${port}`);
