// Get steamid64 based user
function dsbotShowResults(result, id) {
    // If user was found then print it. If it was not found let the user know.
    return new Promise((resolve) => {
        if (typeof result != 'undefined') {
            // create a variable multiline to return multiline in discord
            let multiline = `Found user: ${id}.\nDiscord name: ${result.discord_name}\n`;
            multiline += `Print all user parameters:\n`;

            // Loop over existing fields and add into multiline array
            Object.entries(result).forEach(([key, value]) => {
                if (key == 'steam64id') {
                    multiline += `- steam64id: ${id}\n`;
                } else {
                    multiline += `- ${key}: ${String(value)}\n`;
                }

            });
            // return the multiline
            resolve(`${multiline}`);
        } else {
            // if no user found, let the user know
            resolve(`User with the id ${id} was not found`);
        }
    });
}
// Create a seprate output function if we want all the users to be outputed.
function dsbotShowAllResults(result) {
    return new Promise((resolve) => {
        // use the same multiline logic as above
        let multiline = '';

        // loop over all the result and add into array
        for (let i = 0; i < result.length; i++) {
            multiline += `Found user: ${result[i].steam64id}.\nDiscord name: ${result[i].discord_name}\n\n`;
        };

        // return the value
        resolve(`${multiline}`);
    });
}

// Get the user based on the id given
async function dsbotGetUserSteamID(id) {
    // import the db function to read from the database
    const { dbFindUser, dbAllFindUser } = require('../../dbAct/get');

    // if we specify all with our get command act a little different
    if (id === 'all') {
        const result = await dbAllFindUser();
        message = await dsbotShowAllResults(result);
    } else {
    // else give standard output
        const result = await dbFindUser(`${id}`);
        message = await dsbotShowResults(result, `${id}`);
    }
    // return our message to be printed into discord
    return new Promise((resolve) => {
        resolve(message);
    });
}
exports.dsbotGetUserSteamID = dsbotGetUserSteamID;
