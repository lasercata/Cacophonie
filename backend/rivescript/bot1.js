require('dotenv').config();
const { Client, IntentsBitField, DiscordjsErrorCodes } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', (c) => {
    console.log(`✅ Logged in as ${c.user.tag}!`);
});

client.on('messageCreate', (msg) => {
    if (msg.author.bot) return; // Ignore messages from bots
    console.log(`📥 Message received: ${msg}`);
    if (msg.content === 'ping') {
        reply = 'pong';
    }
    if (msg.content === 'hello') {
        reply = 'Hello there !';
    }
    if (msg.content === 'Louis') {
        reply = 'TG!';
    }
    msg.reply(reply);
    console.log(`📤 Reply sent: ${reply}`);
});

client.login(process.env.DISCORD_BOT_TOKEN_1);
