/**
 * @file Creates the routes for the bots part
 * @module routes/bots.js
 */

const express = require('express');
const router = express.Router();
const botController = require('../controllers/botController');

/**
 * @swagger
 * /api/bots:
 *   get:
 *     summary: Get the list of all bots
 *     description: Get the list of all bots.
 */
router.get('/', botController.getAllBots);

/**
 * @swagger
 * /api/bots:
 *   post:
 *     summary: Creates a new bot
 *     description: Creates a new bot.
 */
router.post('/', botController.createBot);

/**
 * @swagger
 * /api/bots/:id:
 *   get:
 *     summary: Get informations about a specified bot
 *     description: Get informations about a specified bot.
 */
router.get('/:id', botController.getBotById);

/**
 * @swagger
 * /api/bots/:id:
 *   patch:
 *     summary: Update a bot
 *     description: Update a bot.
 */
router.patch('/:id', botController.updateBot);

/**
 * @swagger
 * /api/bots/:id:
 *   delete:
 *     summary: Delete a bot
 *     description: Delete a bot.
 */
router.delete('/:id', botController.deleteBot);

/**
 * @swagger
 * /api/bots/:id/status:
 *   get:
 *     summary: Get a bot status
 *     description: Get a bot status.
 */
router.get('/:id/status', botController.getBotStatus);

/**
 * @swagger
 * /api/bots/:id/status:
 *   update:
 *     summary: Update  a  bot status
 *     description: Update a bot status.
 */
router.patch('/:id/status', botController.updateBotStatus);

/**
 * @swagger
 * /api/bots/:id/rivescript:
 *   get:
 *     summary: Get  a  bot rivescript
 *     description: Get a  bot rivescript.
 */
router.get('/:id/rivescript', botController.getBotRivescript);

/**
 * @swagger
 * /api/bots/:id/rivescript:
 *   patch:
 *     summary: Update  a  bot rivescript
 *     description: Update a  bot rivescript.
 */
router.patch('/:id/rivescript', botController.updateBotRivescript);

/**
 * @swagger
 * /api/bots/:id/conversations:
 *   get:
 *     summary: Get all the conversations
 *     description: Get all the conversations.
 */
router.get('/:id/conversations', botController.getConversationsByBotId);

module.exports = router;
