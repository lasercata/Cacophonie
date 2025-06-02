const { Database } = require("simpl.db");
const path = require("path");

const file = path.join(__dirname, '../data/db.json');
const db = new Database({ path: file });


if (!db.has("bots")) {
    db.set("bots", []);
}

if (!db.has("conversations")) {
    db.set("conversations", []);
}

module.exports = db;
