export class Time {
    static secsToTime(secs) {
        let time: any = {};
        time.h = Math.floor(secs / 3600);
        secs = secs - (time.h * 3600);
        time.m = Math.floor(secs / 60);
        time.s = secs - (time.m * 60);
        return time;
    }

    static timeToString(time) {
        time.h = time.h > 9 ? time.h : `0${time.h}`;
        time.m = time.m > 9 ? time.m : `0${time.m}`;
        time.s = time.s > 9 ? time.s : `0${time.s}`;
        return `${time.h}:${time.m}:${time.s}`;
    }

    static currTimeSeconds() {
        return Math.floor(Date.now() / 1000);
    }
}