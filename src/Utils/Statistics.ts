export class Statistics {
    static getUsage(callback) {
        const pidusage = require('pidusage');

        pidusage.stat(process.pid, (err, stat) => {
            if (err) return console.log(err.message);

            let res = {
                cpu: (stat.cpu / 100).toFixed(2),
                ram: (stat.memory / 1024 / 1024).toFixed(2)
            };

            callback(res);
        });
    }

    static getUsageString(callback) {
        Statistics.getUsage((stat) => {
            callback(`CPU: ${stat.cpu} %\nRAM: ${stat.ram} MB`);
        });
    }

    client: any;

    constructor(client) {
        this.client = client;
    }

    getTotalUsers() {
        const guilds = this.client.guilds.array();
        let memberCount = 0;
        for (let i=0;i < guilds.length; i++) {
            memberCount += guilds[i].memberCount;
        }
        return memberCount;
    }

    getTotalChannels() {
        return this.client.channels.array().length;
    };

    getTotalGuilds() {
        return this.client.guilds.array().length;
    };

    getUptime() {
        return Math.floor(this.client.uptime / 1000);
    };

    getPing() {
        return Math.floor(this.client.ping);
    };

    getVoiceConnections() {
        return this.client.voiceConnections.array().length;
    };
}