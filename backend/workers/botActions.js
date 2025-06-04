/**
 * @file Interaction between the controller and the live bots.
 * @module workers/botActions.js
 */

//------Imports
require("dotenv").config();

const discordBotModule = require("../rivescript/bot");


//------Init
/**
 * @type {Object[]} bot_list - the list of bots for the current session
 * Example: [{1: bot1}, {2: bot2}]
 */
let bot_list = [];

let tokens = [
    process.env.DISCORD_BOT_TOKEN_1,
    process.env.DISCORD_BOT_TOKEN_2,
    process.env.DISCORD_BOT_TOKEN_3
]
let tokens_available = [
    false,
    false,
    false
]


//------Functions
/**
 * Serve a token if available.
 * Otherwise return -1
 */
function serveToken() {
    //---Check if there is a usable token
    if (!tokens_available.includes(false))
        return -1

    let idx = tokens_available.findIndex(t => t == false);
    tokens_available[idx] = true;
    return idx; //, tokens[idx];
}

/**
 * Opposite of `serveToken`, make a token available.
 *
 * @param {string} tokenIndex -  Index of the token to free
 */
function freeToken(tokenIndex) {
    if (tokenIndex >= 0 && tokenIndex < tokens_available.length) {
        tokens_available[tokenIndex] = false;
    }
}

/**
 * Creates a new bot with the provided data.
 *
 * @param {number} id - the id of the bot (from the database).
 * @param {Object} [data] - Data for the new bot.
 * @param {string} [data.status] - The status of the bot.
 * @param {string} [data.rivescript] - Optional path to the Rivescript file.
 *
 * @returns {Bot} The newly created Bot instance.
 */
function createBot(id, data) {
    let tokenIndex = -1;

    if (data.status == 'online') {
        tokenIndex = serveToken();
        if (tokenIndex == -1) throw new Error('No tokens available');
    }

    console.log('here', tokenIndex, Math.max(tokenIndex, 0))
    console.log(tokens[tokenIndex])

    // const newBot = new discordBotModule.DiscordBot(tokens[tokenIndex]);
    // const newBot = new discordBotModule.DiscordBot(tokens[0]);
    const newBot = new discordBotModule.DiscordBot(tokens[Math.max(tokenIndex, 0)]);

    if (data.status !== undefined)
        newBot.setStatus(data.status);

    if (data.rivescript !== undefined)
        newBot.setRivescript(data.rivescript);

    // Add to `bot_list`
    let tmp = {}
    tmp[id] = newBot;
    bot_list.push(tmp);
    // bot_list[id] = newBot;

    return newBot;
}

/**
 * Updates an existing bot's data.
 *
 * @param {number} id - The ID of the bot to update.
 * @param {Object} data - The fields to update in the bot.
 * @param {string} [data.status] - The status of the bot.
 * @param {string} [data.rivescript] - Optional path to the Rivescript file.
 */
function updateBot(id, data) {
    // Get the bot with the id
    let bot_i;
    bot_list.map(obj => {
        if (Object.keys(obj)[0] == id) {
            bot_i = obj[id];
        }
    });

    // Update
    if (data.status !== undefined) {
        const currentStatus = bot_i.getStatus();
        const currentTokenIndex =  tokens.findIndex(t => t === bot_i.getToken());

        if (data.status === 'online' && currentStatus !== 'online') {
            const newTokenIndex = serveToken();
            if (newTokenIndex === -1) throw new Error('No tokens available');
            bot_i.setToken(tokens[newTokenIndex]);

        } else if (data.status === 'invisible' && currentStatus === 'online') {
            freeToken(currentTokenIndex);
        }

        bot_i.setStatus(data.status);
    }

    if (data.rivescript !== undefined)
        bot_i.setRivescript(data.rivescript);
}

/**
 * Disconnects the bot of id `id`.
 *
 * @param {number} id - the bot id
 */
function disconnectBot(id) {
    // Get the bot with the id
    let bot_i;
    bot_list.map(obj => {
        if (Object.keys(obj)[0] == id) {
            bot_i = obj[id];
        }
    });

    // Disconnect
    bot_i.disconnect();

    const tokenIndex = tokens.findIndex(t => t === bot_i.getToken());
    freeToken(tokenIndex);
    
}

//------Exports
module.exports = {
    createBot,
    updateBot,
    disconnectBot
};
