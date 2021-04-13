const hound = require("hound");
const readFile = require("./file_reader_service");
const utils = require("./utils");
const config = require("/data/options.json");

const READ_DELAY = 100;

const watcher = hound.watch(config.logs_directory_path, {});

watcher.on("create", function (file) {
  setTimeout(function () {
    readFile(file, utils.getSensorIdFromPath(file));

    utils.log("start read for directory:\n", file);
  }, READ_DELAY);
});

utils.log("start addon");

watcher.unwatch("./service.js");
