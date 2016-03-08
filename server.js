var fallback = require('express-history-api-fallback');
var express = require('express');
var app = express();

app.get('/api/file', function (req, res) {
  res.send(_results);
});

var root = __dirname;
app.use(express.static(root));
app.use(fallback('index.html', { root: root }));
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Visit http://localhost:' + port + ' to see the app.');

var fs = require('fs');
function walk(dir, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
}

var _results = [];
function walkCallback(err, results) {
  if (err) throw err;
  _results = _results.concat(results);
}

walk('.', walkCallback);
