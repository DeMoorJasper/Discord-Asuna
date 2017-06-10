const Discord = require("discord.js");
const conf = require("../config");
global.client = new Discord.Client();

let updateGame = () => {
  let Statistics = require("./Utils/Statistics").Statistics;
  client.user.setGame(`on ${Statistics.getTotalGuilds()} servers`, conf.github);
};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  updateGame();
});

client.on('guildCreate', () => {
  updateGame();
});

client.on('message', msg => {
  let ChatHandler = require("./Chat/ChatHandler").ChatHandler;
  ChatHandler.handleMessage(msg);
});

client.login(conf.discord);