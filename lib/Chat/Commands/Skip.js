const ChatHandler = require("../ChatHandler").ChatHandler;
const Playlist = require("../../Voice/Playlist").Playlist;
let GuildHandler = require("../../Guild/GuildHandler").GuildHandler;

let Skip = msg => {
    GuildHandler.getGuild(msg.guild.id, data => {
        Playlist.skip(data, playing => {
            ChatHandler.sendMessage(msg, playing);
        });
    });
};

exports.Skip = Skip;