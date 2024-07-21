
const { prefix, bot } = require('./init');
const { dsbotCommand } = require('./commands')

function dsbotMain(){
    bot.on('messageCreate', async input => {
        // if it is a bot, skip
        if (input.author.bot) return;

        // if prefix is not used, skip
        if (!input.content.slice(prefix)) return;

        // get arguments
        const args = input.content.slice(prefix.length).trim().split(/ +/);
        // get command
        let command = args.shift().toLowerCase();

        // Send to get command and get the output
        output = await dsbotCommand(command, `${args}`);
        input.channel.send(output)
    });
}

exports.dsbotMain = dsbotMain;