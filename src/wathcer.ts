import hound from "hound";
import { readFile } from "./file_reader";
import * as utils from "./utils";
import options from "./options";

const READ_DELAY = 100;

const watcher = hound.watch(options.logs_directory_path, {});

watcher.on("create", function (file: string) {
  setTimeout(function (): void {
    readFile(file, utils.getSensorIdFromPath(file));

    utils.log("start read for directory:\n", file);
  }, READ_DELAY);
});

console.log("start addon");

watcher.unwatch("./service.js");
