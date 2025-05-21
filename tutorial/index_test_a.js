// Require the necessary discord.js classes
const { Client,  Events, GatewayIntentBits } = require('discord.js');
const { token, salon_id } = require('./config_test_a.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMembers,] });


const channel = client.channels.cache.get(salon_id);

client.on('messageCreate', async (message) => {

    console.log("Je viens de lire un message")
    if (message.channel.id === salon_id) {
        console.log("il est bien dans mon channel")
        console.log(`son auteur est ${message.author.tag} et moi je suis ${client.user.tag}`)
        
        if(message.author.tag != client.user.tag){
            const channel = client.channels.cache.get(salon_id);
            channel.send(message.content);
        }
        //
    }
}) 



client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
     
    const channel = client.channels.cache.get(salon_id);
    channel.send('Et Hop!');
});

// Log in to Discord with your client's token
client.login(token);