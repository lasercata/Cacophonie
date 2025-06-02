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

    /** Rivescript used by the bot, it can be changed later with a setter */
    this.rivescript = "default_en";

    /** Bot's status in the server */
    this.status = "offline/connected/...";

    this.client = new Client({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
      ],
    });

    // process.env.DISCORD_BOT_TOKEN_1
    this.client.login(token);

    client.on("messageCreate", async (msg) => {
      if (msg.author.bot) return; // Ignore messages from bots
      console.log(`📥 Message received: ${msg}`);
      const reply = await chatbot.reply(msg.author.id, msg.content);
      msg.reply(reply);
      console.log(`📤 Reply sent: ${reply}`);
    });

    this.loadBehabiour();
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
    chatbot
      .loadFile(`backend/rivescript/brain/${this.rivescript}.rive`)
      .then(() => {
        console.log("✅ RiveScript loaded successfully!");
        chatbot.sortReplies();
      })
      .catch((error) => {
        console.error("❌ Error loading RiveScript:", error);
      });
  }

  /** Debugs the bot's login by printing its name in the console. */
  debugLogin() {
    client.on("ready", (c) => {
      console.log(`✅ Logged in as ${c.user.tag}!`);
    });
  }
}
