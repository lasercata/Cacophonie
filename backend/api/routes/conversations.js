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

// route GET /api/conversations/analytics
//router.get('/analytics', conversationController.getConversationsAnalytics);

module.exports = router;
