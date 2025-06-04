/**
 * @file Controller for the bot management: links the endpoint calls to the database calls.
 * @module controllers/botController.js
 */

const botService = require('../../services/botService');
const fs = require('fs');
const path = require('path');

const botActions = require('../../workers/botActions');

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
        const data = req.query;

        if (!data.name) {
            return res.status(400).json({ error: 'name is required' });
        }

        if (data.status !== undefined && (! ['invisible', 'online', 'dnd', 'idle'].includes(data.status)))
            return res.status(400).json({ error: 'status attribute not in [invisible, online, dnd, idle]' });

        const newBot = botService.createBot(data);
        botActions.createBot(newBot.getId(), data);
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

        const data = req.query;

        if (data.status !== undefined && (! ['invisible', 'online', 'dnd', 'idle'].includes(data.status)))
            return res.status(400).json({ error: 'status attribute not in [invisible, online, dnd, idle]' });

        const updatedBot = botService.updateBot(id, data);

        if (!updatedBot) {
            return res.status(404).json({ error: 'Bot not found' });
        }

        botActions.updateBot(id, data);

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

        botActions.disconnectBot(id);

        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/**
 * Retrieves the status of a bot by ID.
 *
 * @param {Request} req - The incoming HTTP request
 * @param {Response} res - The outgoing HTTP response
 * @returns {void}
 */
function getBotStatus(req, res) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid bot id' });

        const bot = botService.getBotById(id);
        if (!bot) return res.status(404).json({ error: 'Bot not found' });

        res.json({ status: bot.status });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/**
 * Updates the status of a bot.
 *
 * @param {Request} req - The incoming HTTP request
 * @param {Response} res - The outgoing HTTP response
 * @returns {void}
 */
function updateBotStatus(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { status } = req.body;

        if (isNaN(id)) return res.status(400).json({ error: 'Invalid bot id' });
        if (!status) return res.status(400).json({ error: 'Status is required' });

        const updatedBot = botService.updateBot(id, { status });
        if (!updatedBot) return res.status(404).json({ error: 'Bot not found' });

        res.json({ message: 'Status updated', status: updatedBot.status });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/**
 * Reads and returns the RiveScript file content for a given bot.
 *
 * @param {Request} req - The incoming HTTP request
 * @param {Response} res - The outgoing HTTP response
 * @returns {void}
 */
function getBotRivescript(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid bot id' });

        const bot = botService.getBotById(id);
        if (!bot) return res.status(404).json({ error: 'Bot not found' });

        const rivescriptPath = bot.rivescript;
        if (!rivescriptPath) return res.status(404).json({ error: 'No rivescript path found for this bot' });

        let fullPath = path.join(__dirname, '..','..','..', rivescriptPath);
        console.log(fullPath);
        fs.readFile(fullPath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read rivescript file' });
            }
            console.log(data);
            res.type('text/plain').send(data);
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/**
 * Updates the path to the RiveScript file for a given bot.
 *
 * @param {Request} req - The incoming HTTP request
 * @param {Response} res - The outgoing HTTP response
 * @returns {void}
 */
function updateBotRivescript(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        const { rivescript } = req.body;

        if (isNaN(id)) return res.status(400).json({ error: 'Invalid bot id' });
        if (!rivescript) return res.status(400).json({ error: 'Rivescript path is required' });

        const updatedBot = botService.updateBot(id, { rivescript });
        if (!updatedBot) return res.status(404).json({ error: 'Bot not found' });

        res.json({ message: 'Rivescript path updated', rivescript: updatedBot.rivescript });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

function getConversationsByBotId (req, res) {};

module.exports = {
    getAllBots,
    getBotById,
    createBot,
    updateBot,
    deleteBot,
    getBotStatus,
    updateBotStatus,
    getBotRivescript,
    updateBotRivescript,
    getConversationsByBotId,
};
