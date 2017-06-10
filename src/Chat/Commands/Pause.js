const ChatHandler = require("../ChatHandler").ChatHandler;
const Playlist = require("../../Voice/Playlist").Playlist;
let GuildHandler = require("../../Guild/GuildHandler").GuildHandler;

let Pause = (msg) => {
    GuildHandler.getGuild(msg.guild.id, (data) => {
        if (Playlist.pause(data)) {
            return ChatHandler.sendMessage(msg, "Track has been paused.");
        }
        ChatHandler.sendMessage(msg, "There was no track playing.");
    });
};

exports.Pause = Pause;