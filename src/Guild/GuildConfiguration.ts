const PATH = "./guildData/";
import { FileSystem } from '../Utils/FileSystem';
import { Time } from '../Utils/Time';

export class GuildConfiguration {
    public static guildCache = {};

    static cleanCache() {
        Object.keys(GuildConfiguration.guildCache).forEach((guildId) => {
            let guild = GuildConfiguration.guildCache[guildId];
            if (guild != null && guild != undefined) {
                if (guild.lastUsed + 300 < Time.currTimeSeconds()) {
                    GuildConfiguration.guildCache[guildId] = undefined;
                }
            }
        });
    }

    static loadGuild(guildId, callback) {
        if (GuildConfiguration.guildCache[guildId]) {
            GuildConfiguration.guildCache[guildId].lastUsed = Time.currTimeSeconds();
            return callback(GuildConfiguration.guildCache[guildId]);
        }
        if (guildId && callback) {
            let path = `${PATH}${guildId}.json`;
            FileSystem.loadJson(path, (data) => {
                GuildConfiguration.guildCache[guildId] = data;
                callback(data);
            });
        }
    }

    static saveGuild(data, callback) {
        if (data && data.id) {
            GuildConfiguration.guildCache[data.id] = data;
            let path = `${PATH}${data.id}.json`;
            FileSystem.saveJson(path, data, callback);
            return;
        }
    }
}