const { handleError,outLog } = require("./Logging");
const { sql } = require("./sql");

//////////////////////
// Variables
//////////////////////

// Array for field for the table users
const userFields = [
    { key: "steam64id", value: "BIGINT PRIMARY KEY"},
    { key: 'discord_name', value: 'VARCHAR(255)' },
    { key: 'age', value: 'INT' },
    { key: 'email', value: 'VARCHAR(255)' },
    { key: 'rank', value: 'VARCHAR(255)' }
]

// list of tables
const tablesToCreate = [
    {name: "users", fields: userFields},
]

// list of example users to use
const users = [
    { steam64ID: '76561198097129793', discord: 'WisePhoenix5678#1234', age: 23, email: 'wisephoenix5678@example.com', rank: 'Lieutenant' },
    { steam64ID: '76561198097129620', discord: 'CunningFalcon7891#1234', age: 39, email: 'cunningfalcon7891@example.com', rank: 'General' },
    { steam64ID: '76561198097129437', discord: 'SunnyBear2217#1234', age: 28, email: 'sunnybear2217@example.com', rank: 'Sergeant' },
    { steam64ID: '76561198097129578', discord: 'LoyalLion8823#1234', age: 45, email: 'loyallion8823@example.com', rank: 'Major' },
    { steam64ID: '76561198097129680', discord: 'SwiftEagle6512#1234', age: 32, email: 'swifteagle6512@example.com', rank: 'Private' },
    { steam64ID: '76561198097129811', discord: 'CoolDragon4875#1234', age: 22, email: 'cooldragon4875@example.com', rank: 'Captain' },
    { steam64ID: '76561198097129915', discord: 'BraveTiger9905#1234', age: 41, email: 'bravetiger9905@example.com', rank: 'Lieutenant' },
    { steam64ID: '76561198097129266', discord: 'DaringWolf8473#1234', age: 27, email: 'daringwolf8473@example.com', rank: 'Corporal' },
    { steam64ID: '76561198097129498', discord: 'GentlePanda1074#1234', age: 20, email: 'gentlepanda1074@example.com', rank: 'General' },
    { steam64ID: '76561198097129925', discord: 'CleverSerpent4392#1234', age: 36, email: 'cleverserpent4392@example.com', rank: 'Colonel' }
]

//////////////////////
// FUNCTIONS
//////////////////////


// Function to create new items into the database
function createTable(name, fieldsIn) {
    // change array into sql formated fields
    const fields = fieldsIn.map(field => {
        return `${sql.escapeId(field.key)} ${field.value}`;
    }).join(", ");
    // Create query
    const query = `CREATE TABLE IF NOT EXISTS ${sql.escapeId(name)} (${fields});`;
    // create the table
    sql.query(query, (err) => {
        handleError(err);
        outLog(`Created table ${name}`);
    });
}

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
function createUser(steam64ID, discordName, age, email, rank, dupCheck = true){
    const query = generateCreateUserQuery(dupCheck);
    
    sql.query(query, [steam64ID, discordName, age, email, rank], err=>{
        handleError(err);
        outLog(`User created with steamid ${steam64ID}. Users discord: ${discordName}.`)
    });
}
// Create User is used in ./main.js
exports.createUser = createUser;

// uses arrays to create tables and users
function initUsers(run) {
    // run only if user wants it.
    if (run){
        // Loop over tables to create all the tables we want
        tablesToCreate.forEach(table =>{
            createTable(table.name, table.fields);
        });
        // when creating turn dub_check off
        dupCheck=false
        // loop over users to create test users
        users.forEach(user=>{
            createUser(user.steam64ID, user.discord, user.age, user.email, user.rank, dupCheck);
        })
    }
}
// Used in main.js
exports.initUsers = initUsers;