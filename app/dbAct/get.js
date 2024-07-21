const { sql } = require("./sql");

// Create a promise function to return found users
async function dbFindUser(id){    
    const query = `SELECT * FROM users WHERE steam64id='${id}';`
    const result = await sql.promise().query(query)
    return new Promise((resolve)=>{
        resolve(result[0][0]);
    });
}
async function dbAllFindUser(id){    
    const query = `SELECT CAST(steam64id AS CHAR) AS steam64id, discord_name FROM users;`
    const result = await sql.promise().query(query)
    return new Promise((resolve)=>{
        resolve(result[0]);
    });
}

exports.dbAllFindUser = dbAllFindUser;
exports.dbFindUser = dbFindUser;