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
	var track = req.query.track;
	var position = req.query.position;
	var timestamp = req.query.timestamp;
  
  res.send({
  	'sucess' : {
  	'track' : track,
  	'position' : position,
  	'timestamp' : timestamp
  	}
  });

});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


