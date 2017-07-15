const Discord = require("discord.js");
const http = require('http');
import { ChatHandler } from '../ChatHandler';

export class Meme {
    client: any;
    chatHandler: ChatHandler;

    constructor(client) {
        this.client = client;
        this.chatHandler = new ChatHandler(client);
    }

    getMemes = (callback) => {
        const options = {
            host: 'api.imgflip.com',
            path: '/get_memes'
        }

        const request = http.request(options, (res) => {
            var data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.once('end', function () {
                try {
                    callback(JSON.parse(data));
                } catch (e) {
                    callback(e);
                }
            });
        });

        request.on('error', function (e) {
            callback(e);
        });

        request.end();
    }

    execute(msg) {
        this.getMemes((data) => {
            if (data.data && data.data.memes) {
                let number = Math.floor(Math.random() * 100);
                let url = data.data.memes[number].url;
                let title = data.data.memes[number].name;
                this.chatHandler.sendImage(msg, `"${title}"`, url);
                return;
            }
            let url = require("../../../config").server_down;
            let title = "The servers have let us down, try again later.";
            this.chatHandler.sendImage(msg, `"${title}"`, url);
            console.log("Meme server has given us an error :(");
        });
    };
}