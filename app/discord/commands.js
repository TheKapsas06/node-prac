// Get steamid64 based user
function dsbotShowResults(result, id){
    // If user was found then print it. If it was not found let the user know.
    return new Promise((resolve) => {
        if ( typeof result != 'undefined' ){
            let multiline = `Found user: ${id}.\nDiscord name: ${result.discord_name}\n`
            multiline += `Print all user parameters:\n`
            Object.entries(result).forEach( ([key,value]) => {
                if (key == 'steam64id'){
                    multiline += `- steam64id: ${id}\n`
                } else {
                    multiline += `- ${key}: ${String(value)}\n`;
                }
                
            });
            resolve(`${multiline}`)
        } else {
            resolve(`User with the id ${id} was not found`);
        }
    });
}
function dsbotShowAllResults(result){
    return new Promise((resolve) => {
        let multiline = '';
        for (let i = 0; i < result.length; i++) {
            multiline += `Found user: ${result[i].steam64id}.\nDiscord name: ${result[i].discord_name}\n\n`
        };
        resolve(`${multiline}`)
    });
}

async function dsbotGetUserSteamID(id){
    const { dbFindUser, dbAllFindUser } = require('../dbAct/get')
    if (id === 'all'){
        const result = await dbAllFindUser();
        message = await dsbotShowAllResults(result);
    } else {
        const result = await dbFindUser(`${id}`);
        message = await dsbotShowResults(result, `${id}`);
    }
    return new Promise((resolve) => {
        resolve(message);
    });
}

// get help menu
function dsbotGetHelp(){
    const { prefix } = require('./init');
    message = [
        '## ',
        'List of all commands available',
        `- ${prefix} get <steam64id> 'Get User by steam64id'`,
        `- ${prefix} get all 'Get all user with breif view'`,
        `- ${prefix} bogus <not_valid>`,
        `- ${prefix} bogus2 <not_valid_again>`,
        '###',
        'end of list'
    ];
    let output = '';
    for (let i = 0; i < message.length; i++) {
        output += `${message[i]}\n`;
    };
    return new Promise((resolve) => {
        resolve(output);
    });
}

// main command funtion
function dsbotCommand(command, args){
    if (command === 'get'){
        output = dsbotGetUserSteamID(`${args}`);
    }
    if (command === 'help'){
        output = dsbotGetHelp();
    }
    return new Promise((resolve) => {
        resolve(output);
    });
}

exports.dsbotCommand = dsbotCommand;