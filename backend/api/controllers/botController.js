/**
 * @file Controller for the bot management: links the endpoint calls to the database calls.
 * @module controllers/botController.js
 */

const botService = require('../../services/botService');

/**
 * Sends json containing all the bots.
 *
 * @param {Request} req - the incoming HTTP request
 * @param {Response} res - the outgoing HTTP response
 *
 * @returns {void}
 */
function getAllBots(req, res) {
    try {
        const bots = botService.getBots();
        res.json(bots);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/**
 * Sends data corresponding to the bot id passed in param.
 *
 * @param {Request} req - the incoming HTTP request
 * @param {Response} res - the outgoing HTTP response
 *
 * @returns {void}
 */
function getBotById(req, res) {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid bot id' });
        }

        const bot = botService.getBotById(id);

        if (!bot) {
            return res.status(404).json({ error: 'Bot not found' });
        }

        res.json(bot);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/**
 * Creates a new bot, with the name passed in param.
 *
 * @param {Request} req - the incoming HTTP request
 * @param {Response} res - the outgoing HTTP response
 *
 * @returns {void}
 */
function createBot(req, res) {
    try {
        const data = req.body;

        if (!data.name) {
            return res.status(400).json({ error: 'name is required' });
        }
        if (!data.status) {
            return res.status(400).json({ error: 'status is required' }); //TODO: do we really need the status to create a bot ?
        }

        const newBot = botService.createBot(data);
        res.status(201).json(newBot);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/**
 * Updates bot informations.
 *
 * @param {Request} req - the incoming HTTP request
 * @param {Response} res - the outgoing HTTP response
 *
 * @returns {void}
 */
function updateBot(req, res) {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid bot id' });
        }

        const data = req.body;
        const updatedBot = botService.updateBot(id, data);

        if (!updatedBot) {
            return res.status(404).json({ error: 'Bot not found' });
        }

        res.json(updatedBot);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/**
 * Deletes a bot.
 *
 * @param {Request} req - the incoming HTTP request
 * @param {Response} res - the outgoing HTTP response
 *
 * @returns {void}
 */
function deleteBot(req, res) {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid bot id' });
        }

        const success = botService.deleteBot(id);

        if (!success) {
            return res.status(404).json({ error: 'Bot not found' });
        }

        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// const getBotStatus = (req, res) => {};
// const updateBotStatus = (req, res) => {};
const getBotRivescript = (req, res) => {};
const updateBotRivescript = (req, res) => {};
const getConversationsByBotId = (req, res) => {};

module.exports = {
    getAllBots,
    getBotById,
    createBot,
    updateBot,
    deleteBot,
    // getBotStatus,
    // updateBotStatus,
    getBotRivescript,
    updateBotRivescript,
    getConversationsByBotId,
};
