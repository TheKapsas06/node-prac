const { dsbotGetUserSteamID } = require('./commands/dsbotGetUserSteamID');
const { dsbotAddUser } = require('./commands/dsbotAddUser');

// get help menu
function dsbotGetHelp(){
    const { prefix } = require('./init');
    message = [
        '## ',
        'List of all commands available',
        `- ${prefix} get <steam64id> 'Get User by steam64id'`,
        `- ${prefix} get all 'Get all user with breif view'`,
        `- ${prefix} add steam64id:<id> dicordname:<discord> age:<age> rank:<rank> email:<email> 'Add new user to database. Required fields are steamd64id and discordname'`,
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
    if (command === 'add'){
        output = dsbotAddUser(`${args}`)
    }
    if (command === 'help'){
        output = dsbotGetHelp();
    }
    return new Promise((resolve) => {
        resolve(output);
    });
}

exports.dsbotCommand = dsbotCommand;