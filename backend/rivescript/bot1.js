require('dotenv').config();
const { Client, IntentsBitField, DiscordjsErrorCodes } = require('discord.js');
const RiveScript = require('rivescript');

const chatbot = new RiveScript();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

chatbot.loadFile('backend/rivescript/brain/english.rive')
    .then(() => {
        console.log('✅ RiveScript loaded successfully!');
        chatbot.sortReplies();
    })
    .catch((error) => {
        console.error('❌ Error loading RiveScript:', error);
    });

client.on('ready', (c) => {
    console.log(`✅ Logged in as ${c.user.tag}!`);
});

client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return; // Ignore messages from bots
    console.log(`📥 Message received: ${msg}`);
    const reply = await chatbot.reply(msg.author.id, msg.content);
    msg.reply(reply);
    console.log(`📤 Reply sent: ${reply}`);
});

client.login(process.env.DISCORD_BOT_TOKEN_1);
