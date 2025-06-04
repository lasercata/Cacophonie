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

    // bot_list.push(newBot);
    bot_list[id] = newBot;

    return newBot;
}

/**
 * Updates an existing bot's data.
 *
 * @param {number} id - The ID of the bot to update.
 * @param {Object} data - The fields to update in the bot.
 * @returns {Bot|null} The updated Bot instance, or null if not found.
 */
function updateBot(id, data) {
    const bot = bot_list[id];

    // bot.

    // const bots = getBots();
    // const index = bots.findIndex(bot => bot.id === id);
    //
    // if (index === -1) {
    //     return null;
    // }
    // 
    // const updatedData = { ...bots[index], ...data };
    // const updatedBot = new Bot(updatedData);
    //
    // bots[index] = updatedBot;
    // db.set("bots", bots);
    // return bots[index];
}

//------Exports
module.exports = {
    createBot,
    updateBot
};
