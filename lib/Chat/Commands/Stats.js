const Discord = require("discord.js");
const ChatHandler = require("../ChatHandler").ChatHandler;
const Statistics = require("../../Utils/Statistics").Statistics;
const Time = require("../../Utils/Time").Time;
const Config = require("../../../config");

let Stats = msg => {
    let embed = new Discord.RichEmbed();
    embed.setAuthor(client.user.username, client.user.displayAvatarURL);
    let upTime = Time.timeToString(Time.secsToTime(Statistics.getUptime()));
    Statistics.getUsage(data => {
        embed.addField("CPU", `${data.cpu} %`, "true");
        embed.addField("RAM", `${data.ram} MB`, "true");
        embed.addField("PING", `${Statistics.getPing()} ms`, "true");
        embed.addField("UPTIME", upTime, "true");
        embed.addField("SERVERS", Statistics.getTotalGuilds(), "true");
        embed.addField("CHANNELS", Statistics.getTotalChannels(), "true");
        embed.addField("TOTAL USERS", Statistics.getTotalUsers(), "true");
        embed.addField("VOICE CONNECTIONS", Statistics.getVoiceConnections(), "true");
        embed.addField("GITHUB", Config.github, "false");

        ChatHandler.sendEmbed(msg, "", embed);
    });
};

exports.Stats = Stats;