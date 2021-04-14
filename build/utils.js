"use strict";
exports.__esModule = true;
exports.log = exports.getSensorIdFromPath = void 0;
// @ts-ignore
var options_json_1 = require("/data/options.json");
function getSensorIdFromPath(path) {
    var res = path.split("/");
    return res[res.length - 2].replace("/", "");
}
exports.getSensorIdFromPath = getSensorIdFromPath;
function log() {
    var message = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        message[_i] = arguments[_i];
    }
    if (options_json_1["default"].debug) {
        console.log(message);
    }
}
exports.log = log;
