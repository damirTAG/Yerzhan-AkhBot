require("dotenv").config();
const { Client, IntentsBitField, ActivityType } = require("discord.js");
const eventHandler = require("./handlers/eventHandler");
const listWords = require("./data/list");

const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent],
});
client.on("ready", (c) => {
    console.log(`${c.user.tag} online`);
    client.user.setActivity({
        name: "Реальная жизнь",
        type: ActivityType.Playing,
    });
});

(async () => {
    try {
        eventHandler(client);

        client.login(process.env.TOKEN);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();

client.on("messageCreate", (message) => {
    if (message.author.bot) {
        return;
    }
    for (var i = 0; i < listWords.length; i++) {
        if (message.content.includes(listWords[i])) {
            message.reply(`что такое **${listWords[i]}**?`);
        }
    }
});
