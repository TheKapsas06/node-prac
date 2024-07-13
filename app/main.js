// Import logging and database creation
const { initdb } = require('./initDB');
const { handleError, outLog } = require('./Logging');

// Run init before running sql connection
// If you need example data enable these functions. Otherwise keep them false.
initdb(true);

// Initzialise main database connection only after creating the database
const { sql } = require('./sql');
const { initUsers, createUser } = require('./initUsers');

// Create example users
initUsers(true);



//
sql.connect( err=> {
    handleError(err);
    outLog('Connected to main sql.');
})

function sqlQuery(sql, queryValue){

}

function main(){
    outLog('Made it to main function.');
    sql.end(err=>{handleError(err);outLog('End main sql connection')})
}


main();