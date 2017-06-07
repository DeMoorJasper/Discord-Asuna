const ytdl = require('ytdl-core');

let getAudioStream = (url) => {
    // TODO: Maybe extend and filter it a lil more
    ytdl(url, { filter : 'audioonly' });
};

let YoutubeHandler = {
    getAudioStream: getAudioStream
};

exports.YoutubeHandler = YoutubeHandler;