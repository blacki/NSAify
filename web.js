var express = require('express');
var app = express();
// Add headers
app.options('/user',function (req, res) {
    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.end('');
});

app.use(express.logger());

app.get('/', function(req, res) {
  res.send('Hello NSA!');
});

app.get('/user', function(req, res) {
	// console.log();

	var name = req.query.name;
  res.send('Hello '+name+'!');

});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


