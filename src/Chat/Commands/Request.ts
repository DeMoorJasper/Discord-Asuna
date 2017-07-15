import { ChatHandler } from '../ChatHandler';
import { Playlist } from '../../Voice/Playlist';

export class Play {
    client: any;
    chatHandler: ChatHandler;
    playlist: Playlist;

    constructor(client) {
        this.client = client;
        this.chatHandler = new ChatHandler(client);
        this.playlist = new Playlist(client);
    }

    getLink(content) {
        let regex = /(v=([^&]*))/ig;
        let ytID = content.match(regex);
        if (ytID !== null) {
            ytID = ytID[0].substr(2);

            return `https://www.youtube.com/watch?v=${ytID}`;
        }
        return null;
    }

    execute(msg) {
        let link = this.getLink(msg.content);
        if (link) {
            this.playlist.addTrack(msg.guild.id, link, (data) => {
                this.chatHandler.sendMessage(msg, `Your track has been requested and added to the playlist at possition #${data.length}.`);
            });
            return;
        }
        this.chatHandler.sendMessage(msg, "Song could not be found, please report any found bugs on github.");
    };
}