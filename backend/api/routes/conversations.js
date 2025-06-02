/**
 * @file Creates the routes for the conversations part
 * @module routes/conversations.js
 */

const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');

// route GET /api/conversations
router.get('/', conversationController.getAllConversations);

// route GET /api/conversations/analytics
//router.get('/analytics', conversationController.getConversationsAnalytics);

module.exports = router;
