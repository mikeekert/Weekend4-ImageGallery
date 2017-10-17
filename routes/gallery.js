var router = require('express').Router();
var pool = require('../modules/pool');

var path = require('path');

router.get('/', function(req, res){
    res.sendFile(path.resolve('./public/views/gallery.html'));
});

module.exports = router;