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

    let idx = tokens_available.findIndex(false);
    tokens_available[idx] = true;
    return idx; //, tokens[idx];
}

/**
 * Opposite of `serveToken`.
 *
 * @param {string} token - the token to free
 */
function freeToken(token) {
    const idx = tokens.findIndex(token);
    tokens_available[idx] = false;
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
    const tk = serveToken();

    if (tk == -1)
        throw 

    const newBot = new discordBotModule.DiscordBot(tk);

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
        let tk;

        if (data.status == 'online')
            tk = serveToken();
        // else if (data.status == 'invisible')
        //     freeToken(bot_i.getToken()); //TODO

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

    // freeToken(bot_i.getToken())
}

//------Exports
module.exports = {
    createBot,
    updateBot,
    disconnectBot
};
