const ChatHandler = require("../ChatHandler").ChatHandler;
const Playlist = require("../../Voice/Playlist").Playlist;
let GuildHandler = require("../../Guild/GuildHandler").GuildHandler;

let Clear = (msg) => {
    GuildHandler.getGuild(msg.guild.id, (data) => {
        Playlist.clearPlaylist(data);
        ChatHandler.sendMessage(msg, "Playlist cleared, use the stop command to stop the current song.");
    });
};

exports.Clear = Clear;