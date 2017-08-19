var express = require('express');
var mysql = require('promise-mysql');
var bp = require('body-parser')
var marketerRoutes = require('./routes/marketers')
var app = express();

const mySQLoptions = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'perfpie'
};

var connection;

app.use(express.static('client'));
app.use(express.static('node_modules'));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

mysql.createConnection(mySQLoptions)
    .then(function(conn) {
        connection = conn;
        var query = "CREATE TABLE if not exists marketers (firstName text, lastName text, email text NOT NULL, website text, linkedin text, experience text, UNIQUE (email(100)))";
        connection.query(query);
    }).then(function() {
        app.use('/marketers', marketerRoutes(connection));
    })
    .catch(function(err) {
        throw err;
    });

//not for production, debug use only
app.use(function(err, req, res, next) {
    res.status(500);
    res.send({
        message: err.message,
        error: err
    });
});

app.listen(process.env.PORT || 3001, function() {
    console.log("Listening on 3001");
});