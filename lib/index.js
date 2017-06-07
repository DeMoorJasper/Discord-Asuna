const Discord = require("discord.js");
const client = new Discord.Client();
const conf = require("../config");

let stats = {
    getStats: postback => {
        var pusage = require('pidusage');

        pusage.stat(process.pid, (err, stat) => {
            if (err) return console.log(err.message);

            if (stat.cpu != undefined && stat.memory != undefined) {
                let res = `**CPU** ${(stat.cpu / 100).toFixed(2)} %\n`;
                res += `**RAM** ${(stat.memory / 1024 / 1024).toFixed(2)} Mb\n`;
                postback(res);
            }
        });
    }
};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
    if (msg.content === 'join') {
        const ytdl = require('ytdl-core');
        const streamOptions = { seek: 0, volume: 1 };

        let voiceChannel = client.channels.array();
        for (let i = 0; i < voiceChannel.length; i++) {
            if (voiceChannel[i].type === 'voice') {
                voiceChannel[i].join().then(connection => {
                    const stream = ytdl('https://www.youtube.com/watch?v=uFvTjHch6s8', { filter: 'audioonly' });
                    const dispatcher = connection.playStream(stream, streamOptions);
                }).catch(console.error);
            }
        }

        msg.reply("Joining a voiceChannel");
    }
});

setInterval(() => {
    stats.getStats(res => {
        console.log(res);
    });
}, 10000);

client.login(conf.discord);