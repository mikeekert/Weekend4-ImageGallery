var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var index = require('./routes/index');
var images = require('./routes/images');

app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/', index);
app.use('/images', images);

app.listen(3000, function(){
console.log('listening on port 3000');
});