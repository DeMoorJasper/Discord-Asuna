const fs = require('fs');

export class FileSystem {
    static getDirectoryPath(path) {
        if (path) {
            return path.substring(0, path.lastIndexOf("/"));
        }
    }

    static checkValidPath(path, callback) {
        // Check if path and callback are defined and make path in case necessary
        return (path && callback && FileSystem.makeDirectory(FileSystem.getDirectoryPath(path)));
    }

    static loadFile(path, callback) {
        if (FileSystem.checkValidPath(path, callback)) {
            fs.exists(path, (exists) => {
                if (!exists) {
                    callback(new Error("LOAD FILE: File not found."));
                    return;
                }
                fs.readFile(path, (e, data) => {
                    if (e) {
                        callback(e);
                        return;
                    }
                    callback(data);
                });
            });
        }
    }

    static saveFile(path, content, callback) {
        if (FileSystem.checkValidPath(path, callback)) {
            fs.exists(path, (exists) => {
                if (!exists) {
                    fs.closeSync(fs.openSync(path, 'w'));
                }
                fs.writeFile(path, content, (e) => {
                    if (e) {
                        callback(e);
                        return;
                    }
                    callback("Succesfully saved the file");
                });
            });
        } else {
            callback("Invalid path");
        }
    }

    static loadJson(path, callback) {
        FileSystem.loadFile(path, (data) => {
            if (data instanceof Error) {
                callback(data);
            }
            if (data) {
                try {
                    callback(JSON.parse(data));
                } catch (e) {
                    callback(e);
                }
            } else {
                callback(null);
            }
        });
    }

    static saveJson(path, content, callback) {
        if (!content) {
            callback(new Error("SAVE JSON: Content undefined or empty"));
            return;
        }
        FileSystem.saveFile(path, JSON.stringify(content), callback);
    }

    static makeDirectory(dir) {
        if (!fs.existsSync(dir)){
            try {
                fs.mkdirSync(dir);
                console.log(`Directory "${dir}" created.`);
                return true;
            } catch (e) {
                console.log(`Creating directory "${dir}" caused an error.`);
                console.log(e);
                return false;
            }
        } else {
            return true;
        }
    }
}