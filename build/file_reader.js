"use strict";
exports.__esModule = true;
exports.readFile = void 0;
var fs = require("fs");
var sensors_1 = require("./sensors");
var utils = require("./utils");
// @ts-ignore
var options_json_1 = require("/data/options.json");
function readFile(path, sensorId) {
    utils.log("trigger " + sensorId + " event");
    switch (sensorId) {
        case options_json_1["default"].sensors.motion:
            sensors_1.motionDetect(sensorId);
            break;
        case options_json_1["default"].sensors.sound:
            sensors_1.soundDetect(sensorId);
            break;
        default:
            console.log("Неизвестное id сенсора. sensorId: " + sensorId);
    }
    fs.unlink(path, function (err) {
        if (err) {
            console.log("Не удалось удалить файл " + path);
            console.log(err);
        }
    });
}
exports.readFile = readFile;
