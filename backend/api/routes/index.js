const express = require('express');
const router = express.Router();
const botRoutes = require('./bots');
const conversationRoutes = require('./conversations');

const swaggerRoutes = require('../docs/swagger.js')

router.use('/bots', botRoutes);
router.use('/conversations', conversationRoutes);
router.use('/docs', swaggerRoutes);

module.exports = router;
