var router = require('express').Router();
var pool = require('../modules/pool');




router.get('/:id', function (req, res) {    
    var dbId = req.params.id;
    console.log(dbId);    
    pool.connect(function (conErr, client, done) {
        if (conErr) {
            console.log(conErr);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM gallery WHERE name = $1', [dbId], function (queryErr, resultObj) {
                done();
                if (queryErr) {
                    console.log(queryErr);
                    res.sendStatus(500);
                } else {
                    console.log(resultObj.rows);
                    res.send(resultObj.rows);
                }
            });
        }
    });
});

router.post('/', function (req, res) {
    var dbId = req.body;
    pool.connect(function (conErr, client, done) {
        if (conErr) {
            console.log(conErr);
            res.sendStatus(500);
        } else {
            console.log('no connection error');
            var insertStr = "INSERT INTO gallery (name, likes) SELECT $1, $2 WHERE NOT EXISTS ( SELECT * FROM gallery WHERE name = $1 )";
            client.query(insertStr, [dbId.name, dbId.likes],
                function (queryErr, resultObj) {
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

router.put('/', function (req, res) {
    var dbId = req.body;
    parseInt(dbId.likes);
    dbId.likes += 1;
    pool.connect(function (conErr, client, done) {
        if (conErr) {
            console.log('inside first 500 error -> ' + conErr);
            res.sendStatus(500);
        } else {
            console.log('no connection error in my put');
            var strSQL = 'UPDATE "gallery" SET "likes"= $1 WHERE "name"= $2 RETURNING "id", "name", "likes";';
            client.query(strSQL, [dbId.likes, dbId.name], function (queryErr, result) {
                done();
                if (queryErr) {
                    console.log('inside second 500 error -> ' + queryErr);
                    res.sendStatus(500);
                } else {
                    console.log(result.rows);
                    res.send(result.rows);
                }
            });
        }
    });
}); 

module.exports = router;