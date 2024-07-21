const { Client, GatewayIntentBits } = require('discord.js');
const config = require('../config/config.json');
const { outLog } = require('../Logging');

const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
exports.bot = bot;

const token = config.discord.token;
exports.token = token;

const prefix = config.bot.prefix;
exports.prefix = prefix;

bot.once('ready', () => {
    outLog(`Logged in as ${bot.user.tag}!`);
});

bot.login(token);
