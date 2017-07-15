export class TextUtils {
    static capitalize(text) {
        if ((!text) || text.length < 1) {
            return;
        }
        let res = text.toLowerCase();
        return res[0].toUpperCase() + res.substring(1);
    }
}