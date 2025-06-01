const express = require('express');
const router = express.Router();
const botController = require('../controllers/botController');

// route GET /api/bots
router.get('/', botController.getAllBots);

// route POST /api/bots
router.post('/', botController.createBot);

// route GET /api/bots/:id
router.get('/:id', botController.getBotById);

// route PUT /api/bots/:id
router.put('/:id', botController.updateBot);

// route DELETE /api/bots/:id
router.delete('/:id', botController.deleteBot);

// route GET /api/bots/:id/status
router.get('/:id/status', botController.getBotStatus);

// route PUT /api/bots/:id/status
router.put('/:id/status', botController.updateBotStatus);

// route GET /api/bots/:id/rivescript
router.get('/:id/rivescript', botController.getBotRivescript);

// route PUT /api/bots/:id/rivescript
router.put('/:id/rivescript', botController.updateBotRivescript);

// route GET /bots/{botId}/conversations
router.get('/:id/conversations', botController.getConversationsByBotId);

module.exports = router;