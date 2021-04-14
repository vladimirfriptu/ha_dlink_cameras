"use strict";
exports.__esModule = true;
var hound_1 = require("hound");
var file_reader_1 = require("./file_reader");
var utils = require("./utils");
// @ts-ignore
var options_json_1 = require("/data/options.json");
var READ_DELAY = 100;
var watcher = hound_1["default"].watch(options_json_1["default"].logs_directory_path, {});
watcher.on("create", function (file) {
    setTimeout(function () {
        file_reader_1.readFile(file, utils.getSensorIdFromPath(file));
        utils.log("start read for directory:\n", file);
    }, READ_DELAY);
});
console.log("start addon");
watcher.unwatch("./service.js");
