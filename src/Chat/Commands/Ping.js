const Discord = require("discord.js");
const ChatHandler = require("../ChatHandler").ChatHandler;
const Statistics = require("../../Utils/Statistics").Statistics;

let Ping = (msg) => {
    ChatHandler.sendMessage(msg, `Pong! (avg ${Statistics.getPing()} ms)`);
};

exports.Ping = Ping;