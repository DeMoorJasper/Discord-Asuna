let getUsage = callback => {
    let pidusage = require('pidusage');

    pidusage.stat(process.pid, (err, stat) => {
        if (err) return console.log(err.message);

        let res = {
            cpu: (stat.cpu / 100).toFixed(2),
            ram: (stat.memory / 1024 / 1024).toFixed(2)
        };

        callback(res);
    });
};

let getUsageString = callback => {
    getUsage(stat => {
        callback(`CPU: ${stat.cpu} %\nRAM: ${stat.ram} MB`);
    });
};

let getTotalUsers = () => {
    let guilds = client.guilds.array();
    let memberCount = 0;
    for (let i = 0; i < guilds.length; i++) {
        memberCount += guilds[i].memberCount;
    }
    return memberCount;
};

let getTotalChannels = () => {
    return client.channels.array().length;
};

let getTotalGuilds = () => {
    return client.guilds.array().length;
};

let getUptime = () => {
    return Math.floor(client.uptime / 1000);
};

let getPing = () => {
    return Math.floor(client.ping);
};

let getVoiceConnections = () => {
    return client.voiceConnections.array().length;
};

let Statistics = {
    getUsage: getUsage,
    getUsageString: getUsageString,
    getTotalUsers: getTotalUsers,
    getTotalChannels: getTotalChannels,
    getTotalGuilds: getTotalGuilds,
    getUptime: getUptime,
    getPing: getPing,
    getVoiceConnections: getVoiceConnections
};

exports.Statistics = Statistics;