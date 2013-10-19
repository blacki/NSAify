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


app.get('/user', function(req, res) { 
  var user = req.query;
  var userObj;
  setUser(user);
  var users = [];
  redis.keys("*", function (err, keys) {
    for(var i = 0; i < keys.length; i++) {
      redis.get(keys[i], function (err, val) {
        userObj = val;
        users.push(JSON.parse(userObj));
        if(i == keys.length) {
          // console.log(users);
          res.send(users);
        }
      });
    }     
  });
});



redis.on("error", function (err) {
    console.log("Error " + err);
});
 
//client.on("connect", runSample);
 
function setUser(user) {
  redis.set(user.name,JSON.stringify(user), function (err, reply) {
    console.log(reply.toString());
  });
}
