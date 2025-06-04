const { parentPort } = require('worker_threads');
const RiveScript = require('rivescript');
const winston = require("winston");

// Logger created with the winston logging library
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        // in this file will be stored all the info logs
        new winston.transports.File({ filename: "backend/logs/error.log", level: "warn" }),
        // in this file will be stored all the error logs
        new winston.transports.File({ filename: "backend/logs/app.log" }),
    ],
});

// Création du chatbot
const chatbot = new RiveScript();

// Chargement dynamique du fichier `.rive`
function loadBehaviour(rivescriptName) {
    const filePath = `backend/rivescript/brain/${rivescriptName}.rive`;
    chatbot
        .loadFile(filePath)
        .then(() => {
            console.log(`✅ ${rivescriptName}.rive loaded successfully!`);
            logger.info(`✅ ${rivescriptName}.rive loaded successfully!`);
            chatbot.sortReplies();
        })
        .catch((error) => {
            console.error(`❌ Error loading ${rivescriptName}.rive:`, error);
            logger.error(`❌ Error loading ${rivescriptName}.rive:`, error);
        });
}

// Ecoute les messages du thread principal
parentPort.on('message', async (data) => {
    if (data.type === 'init') {
        // Chargement du fichier RiveScript
        loadBehaviour(data.rivescript);
    }

    if (data.type === 'message') {
        const { userId, content } = data;
        const reply = await chatbot.reply(userId, content);
        parentPort.postMessage({ reply });
    }
});