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
}).catch((e) => {
  console.log(e);
});

client.on('guildCreate', () => {
  updateGame();
}).catch((e) => {
  console.log(e);
});

client.on('message', msg => {
  let ChatHandler = require("./Chat/ChatHandler").ChatHandler;
  ChatHandler.handleMessage(msg);
}).catch((e) => {
  console.log(e);
});

client.login(conf.discord);