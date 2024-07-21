

function parseValuePair(input){
    // split string that was an array into an array
    const pairs = input.split(',');
    // create an empty array to return later
    result = {};

    // set required keys to empty at start
    const defaultKeys = 'steam64id,discordname,age,email,rank'
    const defaultPairs = defaultKeys.split(',');
    defaultPairs.forEach(pair => {
        result[pair] = '';
    })
    // set age to 0 to not fail integer check on mysql, can't be empty string.
    result.age = 0

    // set keys provided overwriting the old ones
    pairs.forEach(pair => {
        const [key,value] = pair.split(':');
        result[key] = value;
    });

    // return the keys we got.
    return result;
}

async function dsbotAddUser(parameters){
    // import createuser to sql
    const { createUser } = require('../../dbAct/create');

    // get key values from user
    const parsedInput = await parseValuePair(parameters);

    // create User based on parameters
    output = await createUser(`${parsedInput.steam64id}`, parsedInput.discordname, parsedInput.age, parsedInput.email, parsedInput.rank);

    // return possible status of the command
    return new Promise((resolve) =>{
        resolve(output)
    });
};


exports.dsbotAddUser = dsbotAddUser;