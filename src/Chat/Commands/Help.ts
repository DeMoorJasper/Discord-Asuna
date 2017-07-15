const Discord = require("discord.js");
const helpMessage = require("../../../help").help;
const prefix = require("../../../config").prefix;
import { ChatHandler } from '../ChatHandler';

export class Help {
    client: any;
    chatHandler: ChatHandler;

    constructor(client) {
        this.client = client;
        this.chatHandler = new ChatHandler(client);
    }

    execute(msg) {
        if (msg.channel.type !== "dm") {
            this.chatHandler.sendMessage(msg, "Help is on the way!");
        }
        
        let embed = new Discord.RichEmbed();
        embed.setAuthor(this.client.user.username, this.client.user.displayAvatarURL);

        embed.addField("Prefix", `In front of your commands use: ${prefix} or @${this.client.user.username}`, "false");

        for (let i=0; i < helpMessage.length; i++) {
            embed.addField(helpMessage[i].command, helpMessage[i].description, "false");
        }

        this.chatHandler.sendPersonalEmbed(msg.author, "Help has arrived!", embed);
    }
}