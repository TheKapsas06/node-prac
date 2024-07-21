const mysql = require('mysql2');
const config = require('../config/config.json')

// Connect to sql
const sql = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
});
exports.sql = sql;
