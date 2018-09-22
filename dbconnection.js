var mysql = require('mysql');

// var connection = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'muflar'
// });

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'demo'
});

module.exports = connection;
