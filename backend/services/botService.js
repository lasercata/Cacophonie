const { Database } = require("simpl.db");
const path = require("path");

const db = new Database({
    path: path.join(__dirname, "../data/db.json"),
});

function getBots() {
    return db.get("bots") || [];
}

function getBotById(id) {
    const bots = getBots();
    return bots.find(bot => bot.id === id);
}

function createBot(data) {
    const bots = getBots();
    const maxId = bots.length === 0 ? 0 : Math.max(...bots.map(bot => bot.id));
    const newId = maxId + 1;
    const newBot = { id: newId, ...data };
    bots.push(newBot);
    db.set("bots", bots);
    return newBot;
}

function updateBot(id, data) {
    const bots = getBots();
    const index = bots.findIndex(bot => bot.id === id);

    if (index === -1) {
        return null;
    }

    bots[index] = { ...bots[index], ...data };
    db.set("bots", bots);
    return bots[index];
}

function deleteBot(id) {
    const bots = getBots();
    const index = bots.findIndex(bot => bot.id === id);

    if (index === -1) {
        return null;
    }

    bots.splice(index, 1);
    db.set("bots", bots);
    return true;
}

module.exports = {
    getBots,
    getBotById,
    createBot,
    updateBot,
    deleteBot,
};
