const { parentPort } = require('worker_threads');
const RiveScript = require('rivescript');
const winston = require("winston");

let logger = null;
const chatbot = new RiveScript();

// Rivescript loading
function loadBehaviour(rivescriptName) {
    const filePath = `backend/rivescript/brain/${rivescriptName}.rive`;
    chatbot
        .loadFile(filePath)
        .then(() => {
            logger?.info(`✅ ${rivescriptName}.rive loaded successfully!`);
            chatbot.sortReplies();
        })
        .catch((error) => {
            logger?.error(`❌ Error loading ${rivescriptName}.rive: ${error}`);
        });
}

// Main thread messages handling
parentPort.on('message', async (data) => {
    if (data.type === 'init') {
        const { botId, rivescript } = data;

        // Logger for this bot
        logger = winston.createLogger({
            level: "info",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.File({ filename: `backend/logs/error_${botId}.log`, level: "warn" }),
                new winston.transports.File({ filename: `backend/logs/app_${botId}.log` }),
            ],
        });

        loadBehaviour(rivescript);
    }

    // Message handling
    if (data.type === 'message') {
        const { userId, content } = data;
        try {
            const reply = await chatbot.reply(userId, content);
            logger?.info(`User ${userId} said: "${content}" -> Reply: "${reply}"`);
            parentPort.postMessage({ reply });
        } catch (err) {
            logger?.error(`Error replying to user ${userId}: ${err}`);
            parentPort.postMessage({ reply: "Désolé, une erreur est survenue." });
        }
    }
});
