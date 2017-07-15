const Discord = require("discord.js");
const Config = require("../../../config");
import { ChatHandler } from '../ChatHandler';
import { Statistics } from '../../Utils/Statistics';
import { Time } from '../../Utils/Time';

export class Stats {
    client: any;
    chatHandler: ChatHandler;
    statistics: Statistics;

    constructor(client) {
        this.client = client;
        this.chatHandler = new ChatHandler(client);
        this.statistics = new Statistics(client);
    }

    execute(msg) {
        let embed = new Discord.RichEmbed();
        embed.setAuthor(this.client.user.username, this.client.user.displayAvatarURL);
        let upTime = Time.timeToString(Time.secsToTime(this.statistics.getUptime()));
        Statistics.getUsage((data) => {
            embed.addField("CPU", `${data.cpu} %`, "true");
            embed.addField("RAM", `${data.ram} MB`, "true");
            embed.addField("PING", `${this.statistics.getPing()} ms`, "true")
            embed.addField("UPTIME", upTime, "true");
            embed.addField("SERVERS", this.statistics.getTotalGuilds(), "true");
            embed.addField("CHANNELS", this.statistics.getTotalChannels(), "true");
            embed.addField("TOTAL USERS", this.statistics.getTotalUsers(), "true");
            embed.addField("VOICE CONNECTIONS", this.statistics.getVoiceConnections(), "true");
            embed.addField("GITHUB", Config.github, "false");

            this.chatHandler.sendEmbed(msg, "", embed)
        });
    }
}