/**
 * @file Model representing a chatbot instance.
 * @module models/Bot.js
 */

/**
 * Represents a Bot.
 * @class
 */
class Bot {
    /**
     * Creates a new Bot instance.
     *
     * @param {Object} data - The bot data.
     * @param {number} [data.id=null] - The unique identifier of the bot.
     * @param {string} [data.name="Default Name"] - The name of the bot.
     * @param {string} [data.status="offline"] - The current status of the bot (e.g., 'online', 'offline').
     * @param {string} [data.rivescript="backend/rivescript/brain/english.rive"] - The file path to the bot's RiveScript.
     */
    constructor(data) {
        /**
         * @type {number}
         */
        this.id = data.id ?? 0;

        /**
         * @type {string}
         */
        this.name = data.name ?? "Default Name";

        /**
         * @type {string}
         */
        this.status = data.status ?? 'offline';

        /**
         * @type {string}
         */
        this.rivescript = data.rivescript ?? 'backend/rivescript/brain/english.rive';
    }
}

module.exports = Bot;
