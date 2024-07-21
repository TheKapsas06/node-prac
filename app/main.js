// Import logging and database creation
const { initdb } = require('./initdb/initDB');
const { outLog } = require('./Logging');
const { initUsers } = require('./initdb/initUsers');
const { dsbotMain } = require('./discord/main')


// Get init command from commandline
const args = process.argv.slice(2);

async function initProgram(){
    // Create a database in mysql to connect to.
    initdb(true);

    // Create example users
    initUsers(true);
}

// main function
function main(){
    // If we get `node app/main.js init` then init the database and do nothing else
    if (args[0] === 'init'){
        // init 
        initProgram();
    } else {
        // start discord bot
        outLog('Start bot process');
        dsbotMain();
    }
}

main();