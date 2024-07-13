// Import logging and database creation
const { initdb } = require('./initDB');
const { outLog } = require('./Logging');

// Create a readline interface
const readline = require('readline')
const rl = readline.Interface({
    input: process.stdin,
    output: process.stdout
});

// Create a database in mysql to connect to.
initdb(false);

// Initzialise main database connection only after creating the database
const { sql } = require('./sql');

// Get initUser to create example users
// Get createUser to create users
const { initUsers, createUser } = require('./initUsers');

// Create example users
initUsers(false);

// Get user input
function getSteamIdFromUser(){
    return new Promise((resolve, reject)=>{
        rl.question('Enter user steam64id: ', (input)=>{
            const id = parseInt(input)
            if (!isNaN(id)) {
                resolve(id);
            } else {
                reject(outLog('Input was not a number'));
                process.exit(1);
            }
        });
    });
}
// Create a promise function to return found users
async function findUser(id){    
    const query = `SELECT * FROM users WHERE steam64id='${id}';`
    const result = await sql.promise().query(query)
    return new Promise((resolve)=>{
        resolve(result[0][0]);
    });
}

function showResults(result, id){
    // If user was found then print it. If it was not found let the user know. 
    if ( typeof result != 'undefined' ){
        outLog(`Found user: ${result.steam64id}. Discord name: ${result.discord_name}`)
        outLog(`Print all user parameters:`)
        Object.entries(result).forEach( ([key,value]) => {
            outLog(`${key}: ${value}`);
        });
    } else {
        outLog(`User with the id ${id} was not found`);
    }
}

// main function
async function main(){
    // Get user input
    const id = await getSteamIdFromUser();
    // find user based on user input
    const result = await findUser(id);
    // If user was found then print it. If it was not found let the user know.
    showResults(result, id);
    process.exit(0);
}


main();