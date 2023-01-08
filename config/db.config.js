var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "sam",
    password: "samkipz",
    database: "api",
    multipleStatements: true
})
connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connection has been established successfully');
})
module.exports = connection