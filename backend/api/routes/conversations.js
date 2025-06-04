/**
 * @file Creates the routes for the conversations part
 * @module routes/conversations.js
 */

const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');

/**
 * @swagger
 * /api/conversations:
 *   get:
 *     summary: Get all the conversations
 *     description: Get all the conversations
 *     responses:
 *       '200':
 *         description: successful operation
 *       '500':
 *         description: internal error
 */
router.get('/', conversationController.getAllConversations);

/**
 * @swagger
 * /api/conversations/{id}:
 *   get:
 *     summary: Get a conversation by ID
 *     description: Get a conversation by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the conversation to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: successful operation
 *       '400':
 *         description: invalid ID supplied
 *       '404':
 *         description: conversation not found
 */
router.get('/:id', conversationController.getConversationById);

// route GET /api/conversations/analytics
//router.get('/analytics', conversationController.getConversationsAnalytics);

module.exports = router;
