const express = require('express');
const router = express.Router();
const botController = require('../controllers/botController');

// route GET /api/bots
router.get('/', botController.getAllBots);

// route POST /api/bots
router.post('/', botController.createBot);

// @route GET /api/bots/:id
router.get('/:id', botController.getBotById);

// route PATCH /api/bots/:id
router.patch('/:id', botController.updateBot);

// route DELETE /api/bots/:id
router.delete('/:id', botController.deleteBot);

// // route GET /api/bots/:id/status
// router.get('/:id/status', botController.getBotStatus);
//
// // route PATCH /api/bots/:id/status
// router.patch('/:id/status', botController.updateBotStatus);
//
// // route GET /api/bots/:id/rivescript
// router.get('/:id/rivescript', botController.getBotRivescript);
//
// // route PATCH /api/bots/:id/rivescript
// router.patch('/:id/rivescript', botController.updateBotRivescript);

// route GET /bots/{botId}/conversations
router.get('/:id/conversations', botController.getConversationsByBotId);

module.exports = router;
