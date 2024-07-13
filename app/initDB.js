const mysql = require('mysql2');
const { handleError,outLog } = require('./Logging');

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
            host: 'localhost',
            user: 'root',
            password: 'test'
        });
        sqlInit.connect(err=>{
            handleError(err);
            outLog('initDb: Connection started')
        })
        createDatabase('test', sqlInit);
        sqlInit.end(err => {
            handleError(err);
            outLog('initDb: Connection closed')
        });
    }
}
exports.initdb = initdb;

