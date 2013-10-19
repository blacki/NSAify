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
  
  var user = req.query;
  res.send('Hello '+user.name+'!');
  setUser(user);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var redis = require("redis").createClient(rtg.port, rtg.hostname);

  redis.auth(rtg.auth.split(":")[1]);
} else {
  var redis = require("redis").createClient();
}

redis.on("error", function (err) {
    console.log("Error " + err);
});
 
//client.on("connect", runSample);
 
function setUser(user) {
    // Set a value
    redis.set(user.name,JSON.stringify(user), function (err, reply) {
        console.log(reply.toString());
    });
    // Get a value
    redis.get(user.name, function (err, reply) {
        console.log(reply.toString());
    });
}
