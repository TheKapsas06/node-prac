const { sql } = require("./sql");
const { handleError,outLog } = require("../Logging");

function generateCreateUserQuery(dup){
    if (dup) {
        const query = "INSERT INTO users (`steam64id`, `discord_name`, `age`, `email`, `rank`) VALUES (?, ?, ?, ?, ?)";
        return query;
    }; 
    if (!dup) {
        const query = "INSERT IGNORE INTO users (`steam64id`, `discord_name`, `age`, `email`, `rank`) VALUES (?, ?, ?, ?, ?)";
        return query;
    }; 
}

// Creates a user with required parameters to users table
async function createUser(steam64ID, discordName, age, email, rank, dupCheck = true){
    const query = generateCreateUserQuery(dupCheck);

    await sql.promise().query(query, [steam64ID, discordName, age, email, rank])
        .then(result => {
            output = (`User created with steamid ${steam64ID}. Users discord: ${discordName}.`)
            outLog(output);
        })
        .catch(error => {
            outLog(`User could not be created.`)
            console.error(error)
            output = `User couldn't be created.`
        });
    return new Promise((resolve)=>{
        resolve(output);
    });
}
// Create User is used in ./main.js
exports.createUser = createUser;


// Function to create new items into the database
async function createTable(name, fieldsIn) {
    // change array into sql formated fields
    const fields = fieldsIn.map(field => {
        return `${sql.escapeId(field.key)} ${field.value}`;
    }).join(", ");
    // Create query
    const query = `CREATE TABLE IF NOT EXISTS ${sql.escapeId(name)} (${fields});`;
    // create the table
    await sql.promise().query(query)
        .then(result => {
            output = (`Table ${name} was created.`)
            outLog(output);
        })
        .catch(error => {
            output = `Table couldn't be created.` 
            outLog(output)
            console.error(error)
        });
    return new Promise((resolve)=>{
        resolve(output);
    });
}
exports.createTable = createTable;