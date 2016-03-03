var fallback = require('express-history-api-fallback');
var express = require('express');
var app = express();
var root = __dirname;
app.use(express.static(root));
app.use(fallback('index.html', { root: root }));
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Visit http://localhost:' + port + ' to see the app.');
