const express = require('express');
const router = express.Router();
const botRoutes = require('./bots');
const conversationRoutes = require('./conversations');

router.get('/', (req, res) => {
  res.json({ //Json description of the API when we do /api
    message: 'API Cacophonie',
    endpoints: {
      bots: '/api/bots',
      conversations: '/api/conversations'
    }
  });
});

router.use('/bots', botRoutes);
router.use('/conversations', conversationRoutes);

module.exports = router;