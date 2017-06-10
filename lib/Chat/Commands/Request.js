const ChatHandler = require("../ChatHandler").ChatHandler;
const Playlist = require("../../Voice/Playlist").Playlist;

let getLink = content => {
    let regex = /(v=([^&]*))/ig;
    let ytID = content.match(regex);
    if (ytID !== null) {
        ytID = ytID[0].substr(2);

        return `https://www.youtube.com/watch?v=${ytID}`;
    }
    return null;
};

let Request = msg => {
    let link = getLink(msg.content);
    if (link) {
        Playlist.addTrack(msg.guild.id, link, data => {
            ChatHandler.sendMessage(msg, `Your track has been requested and added to the playlist at possition #${data.length}.`);
        });
        return;
    }
    ChatHandler.sendMessage(msg, "Song could not be found, please report any found bugs on github.");
};

exports.Request = Request;