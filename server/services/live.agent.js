//const TelegramBot = require('node-telegram-bot-api');
const askToAgent = require("./groq.agent.js")
const { bot } = require("../lib/telegram.js")
// replace the value below with the Telegram token you receive from @BotFather
//const token = '8609445101:AAHWSuqBJ4GOi8wwzT5D9maQUl0fw_Fm16s';

// Create a bot that uses 'polling' to fetch new updates
//const bot = new TelegramBot(token, {polling: true});
//bot.sendMessage("1897909125","SmartKeep Reastart Success!")

bot.on('message', async (msg) => {

  const chatId = msg.chat.id;
  const message = { role: "user", content: msg.text }
  const ans = await askToAgent(message)
  bot.sendMessage(chatId, ans);
});

