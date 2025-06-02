const { Database } = require('simpl.db');
const path = require('path');

const db = new Database({
    path: path.join(__dirname, "../data/db.json"),
});

function getConversations() {
    return db.get('conversations') || [];
}
function getConversationById(id) {
    const conversations = getConversations();

    return conversations.find(conv => conv.id === id);
}

function createConversation(data) {
    const conversations = getConversations();
    const maxId = conversations.length === 0 ? 0 : Math.max(...conversations.map(conv => conv.id));
    const newConv = { id: maxId + 1, ...data };

    conversations.push(newConv);
    db.set('conversations', conversations);

    return newConv;
}

function updateConversation(id, data) {
    const conversations = getConversations();
    const index = conversations.findIndex(conv => conv.id === id);

    if (index === -1) return null;

    conversations[index] = { ...conversations[index], ...data };
    db.set('conversations', conversations);

    return conversations[index];
}

function deleteConversation(id) {
    const conversations = getConversations();
    const index = conversations.findIndex(conv => conv.id === id);

    if (index === -1) return false;

    conversations.splice(index, 1);
    db.set('conversations', conversations);

    return true;
}

module.exports = {
    getConversations,
    getConversationById,
    createConversation,
    updateConversation,
    deleteConversation,
};
