const mysql = require("mysql");

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'system',
    database: 'online_taxi'
});
conn.connect(function (err) {
    // if (err) throw err;
    if (err) {
        console.log(err.message);
    } else {
        console.log("connection created http://localhost:3000");
    }
});
module.exports = conn;