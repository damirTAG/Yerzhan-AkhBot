require("dotenv").config();
const { Client, IntentsBitField, ActivityType } = require("discord.js");
/*
openai
const { Configuration, OpenAIApi } = require('openai');
*/
const eventHandler = require("./handlers/eventHandler");
const listWords = require("./data/list");

const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent],
});
// client.on("ready", (c) => {
//     console.log(`${c.user.tag} online`);
//     client.user.setActivity({
//         name: "Реальная жизнь",
//         type: ActivityType.Playing,
//     });
// });

// (async () => {
//     try {
//         eventHandler(client);

//         client.login(process.env.TOKEN);
//     } catch (error) {
//         console.log(`Error: ${error}`);
//     }
// })();

client.on("messageCreate", (message) => {
    if (message.author.bot) {
        return;
    }
    for (var i = 0; i < listWords.length; i++) {
        if (message.content.includes(listWords[i])) {
            message.reply(`что такое **${listWords[i]}**?`);
            break;
        }
    }
    /* OPENAI START
      if (message.channel.id !== process.env.CHANNEL_ID) return;
      if (message.content.startsWith('!')) return;

      let conversationLog = [
        { role: 'system', content: 'You are a friendly chatbot.' },
      ];

      try {
        await message.channel.sendTyping();
        let prevMessages = await message.channel.messages.fetch({ limit: 15 });
        prevMessages.reverse();

        prevMessages.forEach((msg) => {
          if (msg.content.startsWith('!')) return;
          if (msg.author.id !== client.user.id && message.author.bot) return;
          if (msg.author.id == client.user.id) {
            conversationLog.push({
              role: 'assistant',
              content: msg.content,
              name: msg.author.username
                .replace(/\s+/g, '_')
                .replace(/[^\w\s]/gi, ''),
            });
          }

          if (msg.author.id == message.author.id) {
            conversationLog.push({
              role: 'user',
              content: msg.content,
              name: message.author.username
                .replace(/\s+/g, '_')
                .replace(/[^\w\s]/gi, ''),
            });
          }
        });

        const result = await openai
          .createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: conversationLog,
            // max_tokens: 256, // limit token usage
          })
          .catch((error) => {
            console.log(`OPENAI ERR: ${error}`);
          });
        message.reply(result.data.choices[0].message);
      } catch (error) {
        console.log(`ERR: ${error}`);
      }
    });
    OPENAI END*/
});
