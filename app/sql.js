const mysql = require('mysql2');

// Connect to sql
const sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "test",
    database: "test"
});
exports.sql = sql;
