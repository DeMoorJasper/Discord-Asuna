const PATH = "./guildData/";
const FileSystem = require("../Utils/FileSystem").FileSystem;
const Time = require("../Utils/Time").Time;
global.guildCache = {};

let cleanCache = () => {
    Object.keys(guildCache).forEach(function (guildId) {
        let guild = guildCache[guildId];
        if (guild != null && guild != undefined) {
            if (guild.lastUsed + 300 < Time.currTimeSeconds()) {
                guildCache[guildId] = undefined;
            }
        }
    });
};

let loadGuild = (guildId, callback) => {
    if (guildCache[guildId] !== undefined) {
        guildCache[guildId].lastUsed = Time.currTimeSeconds();
        return guildCache[guildId];
    }
    if (guildId && callback) {
        let path = `${PATH}${guildId}.json`;
        FileSystem.loadJson(path, (data) => {
            guildCache[guildId] = data;
            callback(data);
        });
    }
}

let saveGuild = (data, callback) => {
    if (data && data.id) {
        guildCache[data.id] = data;
        let path = `${PATH}${data.id}.json`;
        FileSystem.saveJson(path, data, callback);
        return;
    }
}

let GuildConfiguration = {
    loadGuild: loadGuild,
    saveGuild: saveGuild,
    cleanCache: cleanCache
};

exports.GuildConfiguration = GuildConfiguration;