const fs = require('fs');

let getDirectoryPath = path => {
    if (path) {
        return path.substring(0, path.lastIndexOf("/"));
    }
};

let checkValidPath = (path, callback) => {
    // Check if path and callback are defined and make path in case necessary
    return path && callback && makeDirectory(getDirectoryPath(path));
};

let loadFile = (path, callback) => {
    if (checkValidPath(path, callback)) {
        fs.exists(path, exists => {
            if (!exists) {
                callback(new Error("LOAD FILE: File not found."));
                return;
            }
            fs.readFile(path, (e, data) => {
                if (err) {
                    callback(e);
                    return;
                }
                callback(data);
            });
        });
    }
};

let saveFile = (path, content, callback) => {
    if (checkValidPath(path, callback)) {
        fs.exists(path, exists => {
            if (!exists) {
                fs.closeSync(fs.openSync(path, 'w'));
            }
            fs.writeFile(path, content, e => {
                if (e) {
                    callback(e);
                    return;
                }
                callback();
            });
        });
    }
};

let loadJson = (path, callback) => {
    loadFile(path, data => {
        if (typeof data === "Error") {
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
};

let saveJson = (path, content, callback) => {
    if (!content) {
        callback(new Error("SAVE JSON: Content undefined or empty"));
        return;
    }
    saveFile(path, JSON.stringify(content), callback);
};

let makeDirectory = dir => {
    if (!fs.existsSync(dir)) {
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
};

let FileSystem = {
    loadFile: loadFile,
    saveFile: saveFile,
    loadJson: loadJson,
    saveJson: saveJson,
    makeDirectory: makeDirectory
};

exports.FileSystem = FileSystem;