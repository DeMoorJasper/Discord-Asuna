const Discord = require("discord.js");
import { ChatHandler } from '../ChatHandler';
import { Statistics } from '../../Utils/Statistics';

export class Ping {
    chatHandler: ChatHandler;
    statistics: Statistics;

    constructor(client) {
        this.chatHandler = new ChatHandler(client);
        this.statistics = new Statistics(client);
    }

    execute(msg) {
        this.chatHandler.sendMessage(msg, `Pong! (avg ${this.statistics.getPing()} ms)`);
    }
}