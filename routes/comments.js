var router = require('express').Router();
var pool = require('../modules/pool');



router.post('/', function (req, res) {    
    var dbId = req.body;
    pool.connect(function (conErr, client, done) {
        if (conErr) {
            console.log(conErr);
            res.sendStatus(500);
        } else {
            client.query('INSERT INTO comments (comment, name) VALUES ($1, $2)', [dbId.comment, dbId.name], function (queryErr, resultObj) {
                done();
                if (queryErr) {
                    res.sendStatus(500);
                } else {
                    res.send(resultObj.rows);
                }
            });
        }
    });
});

router.get('/:id', function (req, res) {    
    var dbId = req.params.id;
    pool.connect(function (conErr, client, done) {
        if (conErr) {
            console.log(conErr);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM comments WHERE name = $1', [dbId], function (queryErr, resultObj) {
                done();
                if (queryErr) {
                    console.log(queryErr);
                    res.sendStatus(500);
                } else {
                    res.send(resultObj.rows);
                }
            });
        }
    });
});

module.exports = router;