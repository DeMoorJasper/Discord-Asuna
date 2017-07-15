const Discord = require("discord.js");
const conf = require("../config");

import { Statistics } from './Utils/Statistics';
import { ChatHandler } from './Chat/ChatHandler';

export class Server {
    client = new Discord.Client();
    statistics: Statistics;
    chatHandler: ChatHandler;

    constructor() {
        this.client.login(conf.discord);
        this.statistics = new Statistics(this.client);
        this.chatHandler = new ChatHandler(this.client);

        this.registerEvents();
    }

    private updateGame() {
        this.client.user.setGame(`on ${this.statistics.getTotalGuilds()} servers`, conf.github);
    }

    private registerReady() {
        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.username}!`);
            this.updateGame();
        });
    }

    private registerGuildCreate() {
        this.client.on('guildCreate', () => {
            this.updateGame();
        });
    }

    private registerOnMessage() {
        this.client.on('message', msg => {
            this.chatHandler.handleMessage(msg);
        });
    }

    private registerEvents() {
        this.registerReady();
        this.registerGuildCreate();
        this.registerOnMessage();
    }
}