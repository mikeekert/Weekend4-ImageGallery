var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var index = require('./routes/index.js');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', index);

app.listen(3000, function(){
console.log('listening on port 3000');
});