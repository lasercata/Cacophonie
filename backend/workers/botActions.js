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


//------Functions
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
    const newBot = new discordBotModule.DiscordBot(process.env.DISCORD_BOT_TOKEN_1); //TODO: do not hard code the value like this !

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
    if (data.status !== undefined)
        bot_i.setStatus(data.status);

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
}

//------Exports
module.exports = {
    createBot,
    updateBot,
    disconnectBot
};
