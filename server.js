var fallback = require('express-history-api-fallback');
var express = require('express');
var app = express();
require('sugar');

app.get('/api/file', function (req, res) {
  res.send(_files);
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

var _files = [];
walk('.', function (err, files) {
  if (err) throw err;
  var allowedFilesRegex = /^\.\/((css)|(font)|(img)|(js)|(template))\//i;
  var notAllowedFilesRegex = /^(\.|_)/;
  _files = (files.remove(function (file) {
    var parts = file.split('/');
    if (notAllowedFilesRegex.test(parts[parts.length - 1])) return true;
    if (parts.length === 2) return false;
    return !allowedFilesRegex.test(file);
  }).map(function (file) { return file.remove(/^\.\//) }));
});
