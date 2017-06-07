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

/* VOICE CHAT - OLD CODE
  if (msg.content === 'join') {
    const ytdl = require('ytdl-core');
    const streamOptions = { seek: 0, volume: 1 };

    let voiceChannel = client.channels.array();
    for (let i=0; i < voiceChannel.length;i++) {
      if (voiceChannel[i].type === 'voice') {
          voiceChannel = voiceChannel[i];
          break;
      }
    }

    voiceChannel.join().then(connection => {
      const stream = ytdl('https://www.youtube.com/watch?v=uFvTjHch6s8', { filter : 'audioonly' });
      const dispatcher = connection.playStream(stream, streamOptions);
      msg.reply(`Joined ${connection.channel.name}`);
    }).catch(console.error);
  }*/