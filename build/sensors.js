"use strict";
exports.__esModule = true;
exports.soundDetect = exports.motionDetect = void 0;
var api_1 = require("./api");
// @ts-ignore
var options_json_1 = require("/data/options.json");
function createCacheValue(obj, id, delay) {
    return setTimeout(function () {
        delete obj[id];
    }, delay);
}
function createSensorsCache(onChangeState) {
    return new Proxy({}, {
        set: function (target, prop, value) {
            if (target[prop]) {
                clearTimeout(target[prop]);
                target[prop] = value;
            }
            else {
                onChangeState("on", prop);
                target[prop] = value;
            }
            return true;
        },
        deleteProperty: function (target, prop) {
            onChangeState("off", prop);
            delete target[prop];
            return true;
        }
    });
}
var motionCache = createSensorsCache(function (state, sensorId) {
    api_1.changeHaSensorValue("turn_" + state, sensorId);
});
var soundCache = createSensorsCache(function (state, sensorId) {
    api_1.changeHaSensorValue("turn_" + state, sensorId);
});
function motionDetect(deviceId) {
    motionCache[deviceId] = createCacheValue(motionCache, deviceId, options_json_1["default"].sensor_live_delay.motion);
}
exports.motionDetect = motionDetect;
function soundDetect(deviceId) {
    soundCache[deviceId] = createCacheValue(soundCache, deviceId, options_json_1["default"].sensor_live_delay.sound);
}
exports.soundDetect = soundDetect;
