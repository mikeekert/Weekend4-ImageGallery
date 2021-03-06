var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var index = require('./routes/index');
var images = require('./routes/images');
var comments = require('./routes/comments');
var gallery = require('./routes/gallery');


app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/', index);
app.use('/images', images);
app.use('/comments', comments);
app.use('/gallery', gallery);

app.listen(process.env.PORT || 5000);