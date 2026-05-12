const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '8609445101:AAHWSuqBJ4GOi8wwzT5D9maQUl0fw_Fm16s';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

function sendMessage(message){
  try{
    bot.sendMessage("1897909125",message)
  }catch(err){}
}

module.exports = { sendMessage , bot}
