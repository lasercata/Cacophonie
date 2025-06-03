/**
 * @file Service handling data access and operations for bot management.
 * Provides functions to interact with the bot database and manipulate bot data.
 * @module services/botService.js
 */

const { Database } = require("simpl.db");
const path = require("path");
const Bot = require("../api/models/Bot")

const db = new Database({
    path: path.join(__dirname, "../data/db.json"),
});

/**
 * Retrieves all bots from the database.
 *
 * @returns {Bot[]} An array of Bot instances.
 */
function getBots() {
    const bots = db.get("bots") || [];
    return bots.map(botData => new Bot(botData))
}

/**
 * Retrieves a single bot by its ID.
 *
 * @param {number} id - The ID of the bot to retrieve.
 * @returns {Bot|null} The matching Bot instance, or null if not found.
 */
function getBotById(id) {
    const bots = getBots();
    return bots.find(bot => bot.id === id);
}


/**
 * Creates a new bot with the provided data.
 *
 * @param {Object} data - Data for the new bot.
 * @param {string} data.name - The name of the bot.
 * @param {string} data.status - The status of the bot.
 * @param {string} [data.rivescript] - Optional path to the Rivescript file.
 * @returns {Bot} The newly created Bot instance.
 */
function createBot(data) {
    const bots = getBots();
    const maxId = bots.length === 0 ? 0 : Math.max(...bots.map(bot => bot.id));
    const newId = maxId + 1;
    const newBot = new Bot({ id: newId, ...data });

    bots.push(newBot);
    db.set("bots", bots);

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
    const bots = getBots();
    const index = bots.findIndex(bot => bot.id === id);

    if (index === -1) {
        return null;
    }
    
    const updatedData = { ...bots[index], ...data };
    const updatedBot = new Bot(updatedData);

    bots[index] = updatedBot;
    db.set("bots", bots);
    return bots[index];
}

/**
 * Deletes a bot by its ID.
 *
 * @param {number} id - The ID of the bot to delete.
 * @returns {boolean|null} True if deleted successfully, or null if not found.
 */
function deleteBot(id) {
    const bots = getBots();
    const index = bots.findIndex(bot => bot.id === id);

    if (index === -1) {
        return null;
    }

    bots.splice(index, 1);
    db.set("bots", bots);
    return true;
}

module.exports = {
    getBots,
    getBotById,
    createBot,
    updateBot,
    deleteBot,
};
