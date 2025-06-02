const conversationService = require('../../services/conversationService');

function getAllConversations(req, res) {
    try {
        const conversations = conversationService.getConversations();
        res.json(conversations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

function getConversationById(req, res) {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid conversation id' });
    }

    try {
        const conversation = conversationService.getConversationById(id);

        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        res.json(conversation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

function createConversation(req, res) {
    const data = req.body;

    if (!data.botId) {
        return res.status(400).json({ error: 'botId is required' });
    }

    if (!data.message) {
        return res.status(400).json({ error: 'message is required' });
    }

    try {
        const newConversation = conversationService.createConversation(data);
        res.status(201).json(newConversation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

function updateConversation(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid conversation id' });
    }

    const data = req.body;

    try {
        const updated = conversationService.updateConversation(id, data);

        if (!updated) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

function deleteConversation(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid conversation id' });
    }

    try {
        const success = conversationService.deleteConversation(id);

        if (!success) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllConversations,
    getConversationById,
    createConversation,
    updateConversation,
    deleteConversation,
};
