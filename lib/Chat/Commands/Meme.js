const Discord = require("discord.js");
const ChatHandler = require("../ChatHandler").ChatHandler;
const http = require('http');

let getMemes = callback => {
    let options = {
        host: 'api.imgflip.com',
        path: '/get_memes'
    };

    let request = http.request(options, res => {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
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
};

let Meme = msg => {
    getMemes(data => {
        if (data.data && data.data.memes) {
            let number = Math.floor(Math.random() * 100);
            let url = data.data.memes[number].url;
            let title = data.data.memes[number].name;
            ChatHandler.sendImage(msg, `"${title}"`, url);
            return;
        }
        let url = require("../../../config").server_down;
        let title = "The servers have let us down, try again later.";
        ChatHandler.sendImage(msg, `"${title}"`, url);
        console.log("Meme server has given us an error :(");
    });
};

exports.Meme = Meme;