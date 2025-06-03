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
 *
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/', botController.getAllBots);

/**
 * @swagger
 * /api/bots:
 *   post:
 *     summary: Creates a new bot
 *     description: Creates a new bot.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *                 default: off
 *
 *     responses:
 *       '201':
 *         description: successful operation
 *       '400':
 *         description: error (name and status are required)
 *       '500':
 *         description: server error
 */
router.post('/', botController.createBot); //TODO: change the enum above

/**
 * @swagger
 * /api/bots/{id}:
 *   get:
 *     summary: Get informations about a specified bot
 *     description: Get informations about a specified bot.
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the bot to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *
 *     responses:
 *       '200':
 *         description: successful operation
 *       '404':
 *         description: bot not found
 */
router.get('/:id', botController.getBotById);

/**
 * @swagger
 * /api/bots/{id}:
 *   patch:
 *     summary: Update a bot
 *     description: Update a bot.
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the bot to update
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *
 *     responses:
 *       '200':
 *         description: successful operation
 *       '404':
 *         description: bot not found
 */
router.patch('/:id', botController.updateBot);

/**
 * @swagger
 * /api/bots/{id}:
 *   delete:
 *     summary: Delete a bot
 *     description: Delete a bot.
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the bot
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *
 *     responses:
 *       '200':
 *         description: successful operation
 *       '404':
 *         description: bot not found
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
 * /api/bots/{id}/conversations:
 *   get:
 *     summary: Get all the conversations
 *     description: Get all the conversations.
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the bot
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *
 *     responses:
 *       '200':
 *         description: successful operation
 *       '404':
 *         description: bot not found
 */
router.get('/:id/conversations', botController.getConversationsByBotId);

module.exports = router;
