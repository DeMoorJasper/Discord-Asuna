const Discord = require("discord.js");
const ChatHandler = require("../ChatHandler").ChatHandler;
const helpMessage = require("../../../help").help;
const prefix = require("../../../config").prefix;

let Help = (msg) => {
    if (msg.channel.type !== "dm") {
        ChatHandler.sendMessage(msg, "Help is on the way!");
    }
    
    let embed = new Discord.RichEmbed();
    embed.setAuthor(client.user.username, client.user.displayAvatarURL);

    embed.addField("Prefix", `In from of your command use: ${prefix} or @${client.user.username}`, "false");

    for (let i=0; i < helpMessage.length; i++) {
        embed.addField(helpMessage[i].command, helpMessage[i].description, "false");
    }

    ChatHandler.sendPersonalEmbed(msg.author, "Help has arrived!", embed);
};

exports.Help = Help;