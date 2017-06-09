const GuildConfiguration = require("./GuildConfiguration").GuildConfiguration;

let getGuild = (guildid, callback) => {
    GuildConfiguration.loadGuild(guildid, (data) => {
        let guildData = {
            id: guildid,
            voiceChannel: null,
            logChannel: null,
            lastUsed: data.lastUsed,
            playlist: data.playlist,
            Save: () => {
                GuildConfiguration.saveGuild(guildData, (data) => {});
            }
        }

        if (data.voiceChannel) guildData.voiceChannel = data.voiceChannel;
        if (data.logChannel) guildData.logChannel = data.logChannel;
        
        callback(guildData);
    });
}

let GuildHandler = {
    getGuild: getGuild
};

exports.GuildHandler = GuildHandler;