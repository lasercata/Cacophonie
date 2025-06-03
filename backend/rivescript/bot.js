require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const RiveScript = require("rivescript");

/** Class to manage the discord bots. */
class DiscordBot {
    /**
     * Class constructor.
     * @param {string} token bot's secret token stored in the .env
     * @constructor
     */
    constructor(token) {
        this.chatbot = new RiveScript();

        // Rivescript used by the bot, it can be changed later with a setter 
        this.rivescript = "default_en";

        this.client = new Client({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.MessageContent,
            ],
        });

        // Debug to assets the bot's connection and print the user values
        this.client.once("ready", () => {
            console.log(`✅ Logged in as ${this.client.user.tag}!`);
            console.log(this.client.user);
        });

        // Message handling
        this.client.on("messageCreate", async (msg) => {
            if (msg.author.bot) return; // Ignore messages from bots
            console.log(`📥 Message received: ${msg}`);
            const reply = await this.chatbot.reply(msg.author.id, msg.content);
            msg.reply(reply);
            console.log(`📤 Reply sent: ${reply}`);
        });

        this.client.login(token);
        this.loadBehabiour();
    }

    /**
     * Sets the bot's status.
     * @param {string} status wanted status in {'idle', 'online', 'Invisible', 'dnd'}
     */
    setStatus(status) {
        if (status in ['idle', 'online', 'Invisible', 'dnd']) {
            this.client.once("ready", () => {
                console.log(`Changing status to : ${status}`);
                this.client.user.setStatus(status);
            });
        }
        else {
            console.log("❌ Error : status not handled !")
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

    /** Loads the bot's rivescript. */
    loadBehabiour() {
        this.chatbot
            .loadFile(`backend/rivescript/brain/${this.rivescript}.rive`)
            .then(() => {
                console.log("✅ RiveScript loaded successfully!");
                this.chatbot.sortReplies();
            })
            .catch((error) => {
                console.error("❌ Error loading RiveScript:", error);
            });
    }
}

// Dirty instance created for test purposes
const bot = new DiscordBot(process.env.DISCORD_BOT_TOKEN_1);
bot.setStatus("dnd");
