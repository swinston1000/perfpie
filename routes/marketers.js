var express = require('express');
var router = express.Router();

var routerFunc = function(connection) {
    router.post('/', function(req, res, next) {
        connection.query("SELECT  COUNT(1) as total FROM marketers WHERE email = ?", req.body.email)
            .then(function(results) {
                if (results[0].total > 0) {
                    throw new Error("Sorry that e-mail address is already in use, please try again.");
                } else {
                    return connection.query('INSERT INTO marketers SET ?', req.body);
                }
            })
            .then(function(results) {
                return connection.query("SELECT COUNT(*) as count FROM marketers")
            })
            .then(function(results) {
                return res.send(JSON.stringify({ count: results[0].count }))
            })
            .catch(function(err) {
                return res.status(500).send(err.message);
            });
    });

    router.get('/count', function(req, res, next) {
        connection.query("SELECT COUNT(*) as count FROM marketers")
            .then(function(results) {
                return res.send(JSON.stringify({ count: results[0].count }));
            })
            .catch(function(err) {
                return res.status(500).send(err.message);
            });
    });

    router.get('/', function(req, res, next) {
        if (req.query.username === "admin" && req.query.password === "password") {
            connection.query("SELECT * FROM marketers")
                .then(function(results) {
                    res.send(JSON.stringify(results));
                })
                .catch(function(err) {
                    res.status(500).send(err.message);
                });
        } else {
            res.status(401).send("You are unauthorized!");
        }
    });

    return router

}

module.exports = routerFunc