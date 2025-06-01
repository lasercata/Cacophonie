const botService = require('../../services/botService');

function getAllBots(req, res) {
  try {
    const bots = botService.getBots();
    res.json(bots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function createBot(req, res) {
  try {
    const data = req.body;

    if (!data.name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!data.status) {
      return res.status(400).json({ error: 'status is required' });
    }

    const newBot = botService.createBot(data);
    res.status(201).json(newBot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getBotStatus = (req, res) => {};
const updateBotStatus = (req, res) => {};
const getBotRivescript = (req, res) => {};
const updateBotRivescript = (req, res) => {};
const getConversationsByBotId = (req, res) => {};

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
