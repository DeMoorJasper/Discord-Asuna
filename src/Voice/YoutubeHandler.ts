const ytdl = require('ytdl-core');

export class YoutubeHandler {
    // TODO: Add extra functionality
    static getAudioStream(url) {
        return ytdl(url, { filter : 'audioonly' });
    }
}