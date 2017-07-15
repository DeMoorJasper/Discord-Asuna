import { ChatHandler } from '../ChatHandler';
import { Playlist } from '../../Voice/Playlist';
import { GuildHandler } from '../../Guild/GuildHandler';

export class Pause {
    client: any;
    chatHandler: ChatHandler;
    playlist: Playlist;

    constructor(client) {
        this.client = client;
        this.chatHandler = new ChatHandler(client);
        this.playlist = new Playlist(client);
    }

    execute(msg) {
        GuildHandler.getGuild(msg.guild.id, (data) => {
            if (!msg.guild.voiceChannel || !msg.guild.logChannel) {
                return this.chatHandler.sendMessage(msg, "Please configure voice channel first!");
            }
            if (this.playlist.pause(data)) {
                return this.chatHandler.sendMessage(msg, "Track has been paused.");
            }
            this.chatHandler.sendMessage(msg, "There was no track playing.");
        });
    }
}