const mysql = require('mysql2');
const config = require('../config/config.json')
const { handleError,outLog } = require('../Logging');

// Function to create a new database
function createDatabase(databaseName, connection) {
    const query = `CREATE DATABASE IF NOT EXISTS ${mysql.escapeId(databaseName)}`;
    connection.query(query, (err, results) => {
        handleError(err);
        outLog(`InitDb: Database '${databaseName}' created successfully!`);
    });
}

// Initizialize the sql database
function initdb(run) {
    // run only if user wants it.
    if (run){
        const sqlInit = mysql.createConnection({
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
        });
        sqlInit.connect(err=>{
            handleError(err);
            outLog('initDb: Connection started')
        })
        createDatabase(config.database.database, sqlInit);
        sqlInit.end(err => {
            handleError(err);
            outLog('initDb: Connection closed')
        });
    }
}
exports.initdb = initdb;

