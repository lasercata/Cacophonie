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
 *     parameters:
 *       - name: name
 *         required: true
 *         in: query
 *         description: name of the bot
 *         schema:
 *           type: string
 *
 *       - name: status
 *         in: query
 *         description: status to set to the bot
 *         schema:
 *           type: string
 *           enum:
 *             - invisible
 *             - online
 *             - idle
 *             - dnd
 *
 *       - name: rivescript
 *         in: query
 *         description: path to the rivescript to use
 *         schema:
 *           type: string
 *
 *     responses:
 *       '201':
 *         description: successful operation
 *       '400':
 *         description: error (name is required)
 *       '500':
 *         description: server error
 */
router.post('/', botController.createBot);

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
 *       - name: name
 *         in: query
 *         description: new name to set to the bot
 *         schema:
 *           type: string
 *
 *       - name: status
 *         in: query
 *         description: new status to set to the bot
 *         schema:
 *           type: string
 *           enum:
 *             - invisible
 *             - online
 *             - idle
 *             - dnd
 *
 *       - name: rivescript
 *         in: query
 *         description: new path to the rivescript to use
 *         schema:
 *           type: string
 *
 *     responses:
 *       '200':
 *         description: successful operation
 *       '400':
 *         description: error in arguments
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
