/**
 * @file API routes. Creates the routes (endpoints).
 * @module routes/index.js
 */

const express = require('express');
const router = express.Router();
const botRoutes = require('./bots');

const swaggerRoutes = require('../docs/swagger.js')

router.use('/bots', botRoutes);
router.use('/docs', swaggerRoutes);

module.exports = router;
