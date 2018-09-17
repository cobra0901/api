var mysql = require('mysql');

// var connection = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'demo'
// });

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'demo'
});

module.exports = connection;
