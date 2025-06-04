require("dotenv").config();

const { Worker } = require('worker_threads');
const { Client, IntentsBitField } = require("discord.js");
const RiveScript = require("rivescript");
const winston = require("winston");

/** Class to manage the discord bots. */
class DiscordBot {
    /**
     * Class constructor.
     * @param {string} token bot's secret token stored in the .env
     * @constructor
     */
    constructor(token) {
        this.token = token;
        this.chatbot = new RiveScript();
        this.rivescript = "default_en";
        this.logger = null;
        this.botId = null;

        this.client = new Client({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.MessageContent,
            ],
        });

        this.client.once("ready", () => {
            this.botId = this.client.user.id;

            // Logger created with the winston logging library
            this.logger = winston.createLogger({
                level: "info",
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json()
                ),
                transports: [
                    // in this file will be stored all the info logs
                    new winston.transports.File({ filename: `backend/logs/error_${this.botId}.log`, level: "warn" }),
                    // in this file will be stored all the error logs
                    new winston.transports.File({ filename: `backend/logs/app_${this.botId}.log` }),
                ],
            });

            console.log(`✅ Logged in as ${this.client.user.tag}!`);
            this.logger.info(`✅ Logged in as ${this.client.user.tag}!`);
            console.log(this.client.user);
            this.logger.info(this.client.user);

            this.getStatus();
            this.client.user.setUsername('CeciEstAussiUnTest');

            this.startWorker();
            this.setupMessageListener();
        });

        this.client.login(token);
    }

    /**
     * Gets the bot's token.
     * @returns the current bot token
     */
    getToken() {
        return this.token
    }

    /**
     * Sets the bot's token to a new value.
     * @param {string} token new token
     */
    setToken(token) {
        this.token = token
        this.client.login(token);
    }

    /**
     * Gets the bot's id.
     * @returns the bot's id
     */
    getId() {
        return this.botId
    }

    /**
     * Multi-threading with bots behaviour.
     */
    startWorker() {
        this.worker = new Worker('./backend/workers/bot.worker.js');
        this.worker.postMessage({
            type: 'init',
            rivescript: this.rivescript,
            botId: this.botId
        });
    }

    /**
     * Message handling with the worker.
     */
    setupMessageListener() {
        this.client.on('messageCreate', async (msg) => {
            if (msg.author.bot) return;
            if (!msg.mentions.has(this.client.user)) return;

            const content = msg.content.replace(`<@${this.client.user.id}>`, '').trim();

            this.worker.postMessage({
                type: 'message',
                userId: msg.author.id,
                content
            });

            console.log(`📥 Message received (pinged): ${content}`);
            this.logger.info(`📥 Message received (pinged): ${content}`);

            this.worker.once('message', ({ reply }) => {
                msg.reply(reply);
                console.log(`📤 Reply sent: ${reply}`);
                this.logger.info(`📤 Reply sent: ${reply}`);
            });
        });
    }

    /**
   * Sets the bot's username on the server.
   * @param {string} username new bot's username
   */
    setUsername(username) {
        if (this.client.user) {
            this.client.user.setUsername(username);
            console.log(`New username set to : ${username}`);
            this.logger?.info(`New username set to : ${username}`);
        }
    }

    /**
    * Gets the bot's current status.
    * @returns {string|null} The current status ('idle', 'online', 'invisible', 'dnd') or null if not available
    */
    getStatus() {
        if (this.client.user && this.client.user.presence) {
            const status = this.client.user.presence.status;
            console.log(`Current status is: ${status}`);
            this.logger?.info(`Current status is: ${status}`);
            return status;
        } else {
            console.log("❌ Error: Could not retrieve status.");
            this.logger?.error("❌ Error: Could not retrieve status.");
            return null;
        }
    }

    /**
     * Sets the bot's status.
     * @param {string} status wanted status in {'idle', 'online', 'Invisible', 'dnd'}
     */
    setStatus(status) {
        const validStatuses = ["idle", "online", "invisible", "dnd"];
        if (validStatuses.includes(status)) {
            if (this.client.user) {
                console.log(`Changing status to: ${status}`);
                this.logger?.info(`Changing status to: ${status}`);
                this.client.user.setStatus(status);
            } else {
                this.client.once("ready", () => {
                    console.log(`Changing status to: ${status}`);
                    this.logger?.info(`Changing status to: ${status}`);
                    this.client.user.setStatus(status);
                });
            }
        } else {
            console.log(`❌ Error: ${status} not handled!`);
            this.logger?.error(`❌ Error: ${status} not handled!`);
        }
    }

    /**
   * Sets the rivescript to the correct behaviour.
   * @param {string} rivescript Behaviour we want the bot to have (i.e. name of the rivescript to load)
   */
    setRivescript(rivescript) {
        this.rivescript = rivescript;
        this.loadBehabiour();
    }


    /** 
     * Loads the bot's rivescript. 
     */
    loadBehabiour() {
        this.chatbot
            // .loadFile(`backend/rivescript/brain/${this.rivescript}.rive`)
            .loadFile(`backend/rivescript/brain/${this.rivescript}`)
            .then(() => {
                console.log(`✅ ${this.rivescript}.rive loaded successfully!`);
                this.logger?.info(`✅ ${this.rivescript}.rive loaded successfully!`);
                this.chatbot.sortReplies();
            })
            .catch((error) => {
                console.error(`❌ Error loading ${this.rivescript}.rive:`, error);
                this.logger?.error(`❌ Error loading ${this.rivescript}.rive:`, error);
            });
    }

    /**
    * Makes the bot invisible and disables message handling.
    */
    disconnect() {
        if (this.client && this.client.user) {
            this.client.user.setStatus("invisible");
            console.log("👻 Bot is now invisible.");
            this.logger?.info("👻 Bot is now invisible.");

            this.client.removeAllListeners("messageCreate");
            console.log("🔇 Message handling disabled.");
            this.logger?.info("🔇 Message handling disabled.");
        } else {
            console.log("❌ Error: Client not initialized or user not ready.");
            this.logger?.error("❌ Error: Client not initialized or user not ready.");
        }
    }

    /**
     * Makes the bot visible and re-enables message handling.
     */
    connect() {
        if (this.client && this.client.user) {
            this.client.user.setStatus("online");
            console.log("🟢 Bot is now online.");
            this.logger?.info("🟢 Bot is now online.");

            this.setupMessageListener();
            console.log("🔔 Message handling re-enabled.");
            this.logger?.info("🔔 Message handling re-enabled.");
        } else {
            console.log("❌ Error: Client not initialized or user not ready.");
            this.logger?.error("❌ Error: Client not initialized or user not ready.");
        }
    }
}

// Dirty instance created for test purposes
// const bot = new DiscordBot(process.env.DISCORD_BOT_TOKEN_1);
// bot.setStatus("idle");
// bot.setRivescript('minimal_fr');
// bot.disconnect()


module.exports = {
    DiscordBot
};
